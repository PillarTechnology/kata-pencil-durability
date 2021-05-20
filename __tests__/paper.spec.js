const Paper = require("../kata/paper");
const Pencil = require("../kata/pencil");

describe("Paper class", () => {
  test("Paper constructor should create a new paper object text property with passed in string", () => {
    const paper = new Paper("Hello world");
    expect(paper.text).toBe("Hello world");
  });
  test("Paper constructor should create a new paper object text property with empty string", () => {
    const paper = new Paper();
    expect(paper.text).toBe("");
  });
  test("Paper constructor should create a new paper object with property erased set to false", () => {
    const paper = new Paper();
    expect(paper.erased).toBeFalsy();
  });
  test("Paper erased property should change from false and reflect a number when eraser method is called", () => {
    const pencil = new Pencil();
    const erase = "TDD is fun but perfecting TDD is more fun!"; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(erase, blankPaper);
    pencil.erase("fun", blankPaper);
    expect(blankPaper.erased).toBe(38);
  });
  test("Paper erased property should change from last erased index to reflect index of new erased word", () => {
    const pencil = new Pencil();
    const erase = "TDD is fun but perfecting TDD is more fun!"; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(erase, blankPaper);
    pencil.erase("fun", blankPaper);
    pencil.erase("TDD", blankPaper);
    expect(blankPaper.erased).toBe(26);
  });
});