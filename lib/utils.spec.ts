import { plus } from './utils'

describe('Test plus', () => {
  it('1~5 plus should except 15', () => {
    expect(plus(1, 2, 3, 4, 5)).toBe(15)
  })
})
