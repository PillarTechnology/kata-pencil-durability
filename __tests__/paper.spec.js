const Paper = require("../kata/paper")

describe("Paper class", () => {
  test("Paper constructor should create a new paper object with passed in properties", () => {
    const paper = new Paper("Hello world");
    expect(paper.text).toBe("Hello world");
  });
});