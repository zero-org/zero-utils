import {
    set,
    // eslint-disable-next-line no-unused-vars
    Path,
} from './set'

const obj = {
    editVal: 0,
    editArrVal: [0],
    setNestVal: {},
    setArrVal: [],
}
const testCase = [
    [
        'editVal',
        2,
        { editVal: 2, editArrVal: [0], setNestVal: {}, setArrVal: [] },
    ],
    [
        'editArrVal[0]',
        2,
        { editVal: 2, editArrVal: [2], setNestVal: {}, setArrVal: [] },
    ],
    [
        'setNestVal.setNestVal.setNestVal',
        2,
        {
            editVal: 2,
            editArrVal: [2],
            setNestVal: { setNestVal: { setNestVal: 2 } },
            setArrVal: [],
        },
    ],
    [
        'setArrVal[1]',
        2,
        {
            editVal: 2,
            editArrVal: [2],
            setNestVal: { setNestVal: { setNestVal: 2 } },
            setArrVal: [undefined, 2],
        },
    ],
    [
        ['arr', 0],
        0,
        {
            editVal: 2,
            editArrVal: [2],
            setNestVal: { setNestVal: { setNestVal: 2 } },
            setArrVal: [undefined, 2],
            arr: [0],
        },
    ],
]

describe('set 方法测试', () => {
    testCase.forEach((item) => {
        const [path, val, result] = item
        test(`set ${path}`, () => {
            expect(set(obj, path as Path, val)).toEqual(result)
        })
    })
})
