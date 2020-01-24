const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

import { getResult, getWorld } from "./process";
let world;
getWorld(true).then(w => (world = w));

async function test(input, uhours = "", size = false) {
  return getResult(world, input, uhours).then(tables => {
    if (size) {
      return tables[0].length;
    }
    return tables[0][0][0];
  });
}

describe("Algorithm Test", () => {
  it("should give CS.451 when CS.451 & EE.202 are given in that order", () => {
    return test("CS.451 EE.202").should.eventually.equal("EE.202L");
  });
  it("should give MATH.212 when MATH.212 is given", () => {
    return test("MATH.212").should.eventually.equal("MATH.212");
  });
  it("should give 2 course when MATH.212 & ECON.210 is given", () => {
    return test("MATH.212 ECON.210", "", true).should.eventually.equal(2);
  });
  it("should give 0 course when CS.333 & unavailable hours '2,11:40 2, 12:40' is given", () => {
    return test("CS.333", "2,11:40 2, 12:40", true).should.eventually.equal(0);
  });
  it("should give 7 course when CS.451 HIST.201 ME.395 CS.333 CS.350 CS.423 BUS.102 is given", () => {
    return test(
      "CS.451 HIST.201 ME.395 CS.333 CS.350 CS.423 BUS.102",
      "",
      true
    ).should.eventually.equal(8);
  });
});
