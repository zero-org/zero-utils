---
  to: src/<%= name %>/<%= name %>.test.js
---
import { <%= name %> } from './<%= name %>'

describe('<%= name %> 方法测试', () => {
  test('具体测试', () => {
    expect(<%= name %>(1)).toBe(1)
  })
})
