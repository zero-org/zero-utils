import clc from 'cli-color'

let isFirstFile = true
export function getFileSizeInfo(
    options,
    bundle,
    {
        fileName, minSize, gzipSize, bundleSize,
    },
) {
    let output = ''
    if (isFirstFile) {
        output = `${clc.move.right(40 - 'FileName'.length)}${clc.bold(
            'FileName',
        )}${clc.move.right(15 - 'Format'.length)}${clc.bold(
            'Format',
        )}${clc.move.right(15 - 'BundleSize'.length)}${clc.bold(
            'BundleSize',
        )}${clc.move.right(15 - 'MinSize'.length)}${clc.bold(
            'MinSize',
        )}${clc.move.right(15 - 'GzipSize'.length)}${clc.bold('GzipSize')}\n`
    }
    isFirstFile = false
    return `${output}${clc.move.right(40 - fileName.length)}${clc.green(
        fileName,
    )}${clc.move.right(15 - bundle.format.length)}${clc.green(
        bundle.format,
    )}${clc.move.right(15 - bundleSize.length)}${clc.green(
        bundleSize,
    )}${clc.move.right(15 - minSize.length)}${clc.green(
        minSize,
    )}${clc.move.right(15 - gzipSize.length)}${clc.green(gzipSize)}`
}
