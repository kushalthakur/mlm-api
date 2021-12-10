import { expect } from 'chai'
import C from './server/calculator.mocha'
/**
 * 
 * TypeScript Test Cases with the following packages: mocha, chai and nyc
*/
describe("calculator", () => {
   it("addition", () => {
      let result = C.Sum(5, 2)
      expect(result).equal(7)
   })
   it('subtract', () => {
      let result = C.Difference(5, 2)
      expect(result).equal(3)
   })
})
