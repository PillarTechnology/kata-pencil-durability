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
    
    test("it should add mantra to blank paper object and degrade point property", () => {
      expect(blankPaper.text).toBe(mantra);
      expect(blankPaper.text.length).toBe(11);
    });
    test("it should reduce pencil point after writing", () => {
      expect(pencil.point).toBe(9);
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

    test("it should sharpen pencil point back to original point", () => {
      pencil.sharpen();
      expect(pencil.point).toBe(20);
    });
  });
});

describe("Erase method", () => {
  describe("Pencil erases given word", () => {
    const pencil = new Pencil();
    const erase = "TDD is fun but perfecting TDD is more fun!"; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(erase, blankPaper);
    
    test("it should erase the last occurance of 'fun' and replace with appropriate whitespaces", () => {
      pencil.erase("fun", blankPaper);
      expect(blankPaper.text).toBe("TDD is fun but perfecting TDD is more    !");
    });
    test("it should degrade the eraser by 3", () => {
      expect(pencil.eraser).toBe(47);
    });
    test("it should erase the last occurance of 'TDD' and replace with appropriate whitespaces", () => {
      pencil.erase("TDD", blankPaper);
      expect(blankPaper.text).toBe("TDD is fun but perfecting     is more    !");
    });
    test("it should degrade the eraser by 3 more", () => {
      expect(pencil.eraser).toBe(44);
    });
  });
});

describe("Edit method", () => {
  describe("Pencil will add new text to previously erased text location", () => {
    const pencil = new Pencil();
    const mantra = "An apple a day keeps the doctor away"; // 30 characters, 1 capital 28 lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);
    pencil.erase("apple", blankPaper); // Should take away 5 from eraser
    pencil.edit("onion", blankPaper); // Should take away 5 from pencil point

    test("it should add 'onion' to blankPaper in space left from erasing 'apple' previously", () => {
      expect(blankPaper.text).toBe("An onion a day keeps the doctor away");
    });
    test("it should degrade pencil point by correct amount when adding new word to paper", () => {
      expect(pencil.point).toBe(15);
    });
    test("it should degrade eraser by correct amount when erasing word from paper", () => {
      expect(pencil.eraser).toBe(45);
    });
  });
  describe("Pencil will add '@' symbol if no whitespace is detected when editing word longer than whitespace available", () => {
    const pencil = new Pencil();
    const mantra = "An apple a day keeps the doctor away"; // 30 characters, 1 capital 28 lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);
    pencil.erase("apple", blankPaper); // Should take away 5 from eraser
    pencil.edit("artichoke", blankPaper); // Should take away 9 from pencil point

    test("it should add 'artichoke' to blankPaper in space left from erasing 'apple' previously but run out of space and add '@' when appropriate", () => {
      expect(blankPaper.text).toBe("An artich@k@ay keeps the doctor away");
    });
    test("it should degrade pencil point by correct amount when adding 'artich@k@' to paper", () => {
      expect(pencil.point).toBe(11);
    });
  });
  describe("Pencil will stop editing if runs out of pencil point", () => {
    const pencil = new Pencil(35);
    const mantra = "An apple a day keeps the doctor away"; // 30 characters, 1 capital 28 lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);
    pencil.erase("apple", blankPaper); // Should take away 5 from eraser
    pencil.edit("artichoke", blankPaper); // Should take away 9 from pencil point

    test("it should add 'artic' to blankPaper before running out of pencil point at which point no more editing can be done and the paper will return the non edited portion", () => {
      expect(blankPaper.text).toBe("An artic a day keeps the doctor away");
    });
    test("it should degrade pencil point by correct amount when adding 'artich' to paper", () => {
      expect(pencil.point).toBe(0);
    });
  });
});