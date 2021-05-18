const Paper = require("../kata/paper")

describe("Paper class", () => {
  test("Paper constructor should create a new paper object text property with passed in string", () => {
    const paper = new Paper("Hello world");
    expect(paper.text).toBe("Hello world");
  });
  test("Paper constructor should create a new paper object text property with empty string", () => {
    const paper = new Paper();
    expect(paper.text).toBe("");
  });
});