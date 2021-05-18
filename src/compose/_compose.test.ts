import { compose } from './compose'

const trim = (str) => str.trim()
const toLowerCase = (str) => str.toLowerCase()
const split = (str, sep = ',') => str.split(sep)
const getResult = compose([trim,
    toLowerCase,
    split])
describe('compose 方法测试', () => {
    test('execute', () => {
        expect(getResult('a,b,c ')).toEqual(['a',
            'b',
            'c'])
    })
})
