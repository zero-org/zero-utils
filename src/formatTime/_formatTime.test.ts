import { formatTime } from './formatTime'

describe('formatTime 方法测试', () => {
    const testCase = [
        [[1603809694212], '2020-10-27'],
        [[1603809694212, 'yyyy/MM/dd'], '2020/10/27'],
        // [[1603809694212, 'yyyy-MM-dd hh:mm:ss'], '2020-10-27 22:41:34'],
        // [[1603809694212, 'yyyy-MM-dd h:m:s'], '2020-10-27 22:41:34'],
    ]
    type Params = [number, string]
    test.each(testCase)('formatTime(%p)', (params, result) => {
        expect(formatTime(...(params as Params))).toEqual(result)
    })
})
