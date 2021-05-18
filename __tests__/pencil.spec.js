const Pencil = require("../kata/pencil");
const Paper = require("../kata/paper");

describe("Pencil class", () => {
  test("Pencil constructor should create a new pencil object with passed in properties", () => {
    const pencil = new Pencil(100, 10, 20);
    expect(pencil.point).toBe(100);
    expect(pencil.size).toBe(10);
    expect(pencil.eraser).toBe(20);
  });
  test("Pencil constructor should create a new pencil object with default properties if nothing passed in", () => {
    const pencil = new Pencil();
    expect(pencil.point).toBe(50);
    expect(pencil.size).toBe(10);
    expect(pencil.eraser).toBe(50);
  });
  test("Pencil constructor should create a new pencil object with point property equal to value passed in", () => {
    const pencil = new Pencil(1);
    expect(pencil.point).toBe(1);
    expect(pencil.size).toBe(10);
    expect(pencil.eraser).toBe(50);
  });
  test("Pencil constructor should create a new pencil object with size property equal to value passed in", () => {
    const pencil = new Pencil(10, 20);
    expect(pencil.point).toBe(10);
    expect(pencil.size).toBe(20);
    expect(pencil.eraser).toBe(50);
  });
});

describe("Write method", () => {
  describe("Pencil writes to blank paper", () => {
    const pencil = new Pencil(20);
    const mantra = "TDD is fun "; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);
    
    test("it should add mantra to blank paper object", () => {
      expect(blankPaper.text).toBe(mantra);
      expect(blankPaper.text.length).toBe(11);
    });
    test("it should cutoff text if pencil point not durable enough", () => {
      pencil.write("and very rewarding!", blankPaper);
      expect(blankPaper.text).toBe("TDD is fun and very re");
    });
  });
});

describe("Sharpen method", () => {
  describe("Pencil point dulls after writing", () => {
    const pencil = new Pencil(20);
    const mantra = "TDD is fun "; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);
    
    test("it should reduce pencil point", () => {
      expect(pencil.point).toBe(9);
    });
    test("it should sharpen pencil point back to original point", () => {
      pencil.sharpen();
      expect(pencil.point).toBe(20);
    });
  });
});