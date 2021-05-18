import { curry } from './curry'

const fn = (a: any, b: any, c: any) => [a, b, c]
const curried = curry(fn)
const expected = [1, 2, 3]

describe('curry 方法测试', () => {
    test('curried(1, 2, 3)', () => {
        expect(curried(1, 2, 3)).toEqual(expected)
    })
    test('curried(1, 2)(3)', () => {
        expect(curried(1, 2)(3)).toEqual(expected)
    })
    test('curried(1)(2)(3)', () => {
        expect(curried(1)(2)(3)).toEqual(expected)
    })
    test('curried(1)(2, 3)', () => {
        expect(curried(1)(2, 3)).toEqual(expected)
    })
})
