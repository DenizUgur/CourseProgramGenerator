import { expect } from "chai";
import testUtils from "./utils";

describe("application launch", () => {
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it("shows title on screen after launch", function() {
    return this.app.client.getText("#title").then(text => {
      expect(text).to.equal("Course Program Generator");
    });
  });
});
