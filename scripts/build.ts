import path from 'path'
import glob from 'glob'
import fs from 'fs'
import consola from 'consola'
import chalk from 'chalk'
import { rollup } from 'rollup'
import { removeSync } from 'fs-extra'
import rollupConfig from '../rollup.config'

interface BuildStat {
    fnName: string[]
}
class Build {
    state = {
        inputs: glob.sync('src/!(_)*/!(_)*.ts'),
        umdInputScript: '',
        esInputScript: '',
        lib: 'lib',
        umdInputFile: 'src/index.ts',
        esOutputFile: 'lib/es/index.js',
        desc: '// 此文件是脚本自动生成，请勿在此修改\n\n',
    }

    checkEntry() {
        const { inputs, lib } = this.state
        if (inputs.length === 0) {
            const err = new Error(
                'No files can be built, expect more than 1, but got 0',
            )
            consola.error(err)
            process.exit(0)
        } else {
            console.log(chalk.black.bgGreen('start build'))
            removeSync(lib)
            this.genEntry()
        }
    }

    genEntry() {
        const { inputs } = this.state
        let exportVars = ''
        const buildStat: BuildStat = {
            fnName: [],
        }
        inputs.forEach((files) => {
            const name = path.basename(path.dirname(files))
            this.state.umdInputScript += `import ${name} from './${name}/${name}'\n`
            this.state.esInputScript += `import ${name} from './${name}'\n`
            exportVars += `    ${name},\n`
            buildStat.fnName.push(name)
        })
        this.state.umdInputScript += `\nexport default {\n${exportVars}}\n`
        this.state.esInputScript += `\nexport default {\n${exportVars}}\n`
        fs.writeFileSync(
            './build-stat.json',
            JSON.stringify(buildStat, null, 4),
        )
    }

    mergeDts() {
        const outputDts = glob.sync('lib/es/**/*.d.ts')
        // console.log('outputDts :>> ', outputDts)

        let dtsContent = ''
        outputDts.forEach((dts) => {
            if (dts.indexOf('index.d.ts') !== -1) {
                removeSync(dts)
            } else {
                const content = fs.readFileSync(dts, 'utf-8')
                dtsContent = content + dtsContent
                const dirname = path.dirname(dts)
                removeSync(dirname)
            }
        })
        fs.writeFileSync('lib/es/index.d.ts', dtsContent)
        fs.writeFileSync('lib/umd/index.d.ts', dtsContent)
    }

    async build(config) {
        const { output } = config
        const { format } = output
        const { umdInputFile, umdInputScript, desc } = this.state
        if (['umd'].includes(format)) {
            fs.writeFileSync(umdInputFile, desc + umdInputScript)
        }
        const bundle = await rollup(config)
        await bundle.write(output)
    }

    async render() {
        this.checkEntry()

        const { esOutputFile, esInputScript, desc } = this.state
        await Promise.all(
            rollupConfig.map(async (config) => {
                await this.build(config)
            }),
        )
            .then(() => {
                fs.writeFileSync(esOutputFile, desc + esInputScript)
                this.mergeDts()
                consola.success('success')
            })
            .catch((err) => {
                console.log('Build utils error :>> ', err)
            })
    }
}

new Build().render()
