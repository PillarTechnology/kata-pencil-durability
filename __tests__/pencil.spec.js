const Pencil = require("../kata/pencil");
const Paper = require("../kata/paper");

describe("Pencil class", () => {
  test("Pencil constructor should create a new pencil object with passed in properties", () => {
    const pencil = new Pencil({point: 100, size: 10, eraser: 20});
    expect(pencil.point).toBe(100);
    expect(pencil.size).toBe(10);
    expect(pencil.eraser).toBe(20);
  });
  test("Pencil constructor should create a new pencil object with default properties if nothing passed in", () => {
    const pencil = new Pencil();
    expect(pencil.point).toBe(50);
    expect(pencil.size).toBe(0);
    expect(pencil.eraser).toBe(50);
  });
  test("Pencil constructor should create a new pencil object with point property equal to value passed in", () => {
    const pencil = new Pencil({point: 1});
    expect(pencil.point).toBe(1);
    expect(pencil.size).toBe(0);
    expect(pencil.eraser).toBe(50);
  });
  test("Pencil constructor should create a new pencil object with size property equal to value passed in", () => {
    const pencil = new Pencil({point:10, size: 20});
    expect(pencil.point).toBe(10);
    expect(pencil.size).toBe(20);
    expect(pencil.eraser).toBe(50);
  });
});

describe("Write method", () => {
  describe("Pencil writes to blank paper", () => {
    const pencil = new Pencil({point: 20});
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
    const pencil = new Pencil({point: 20, size: 10});
    const mantra = "TDD is fun "; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);

    test("it should sharpen pencil point back to original point", () => {
      pencil.sharpen();
      expect(pencil.point).toBe(20);
    });
    test("it shouldn't sharpen an already sharpened pencil, throw error stating pencil already sharpened", () => {
      expect(() => {pencil.sharpen()}).toThrow("Pencil already sharpened");
    });
  });
  describe("Pencil point dulls after writing", () => {
    const shortPencil = new Pencil({point: 20, size: 1});
    const shortFirst = "Goodbye ";
    const shortSecond = "short pencil"
    const shortPaper = new Paper();
    shortPencil.write(shortFirst, shortPaper);
    shortPencil.sharpen();
    shortPencil.write(shortSecond, shortPaper);
    expect(() => {shortPencil.sharpen()}).toThrow("Pencil out of length");
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
    test("it shouldn't erase a word not found on given paper and return the correct error", () => {
      expect(() => {pencil.erase("sad", blankPaper)}).toThrow("Word to erase is not located within given paper");
    });
    test("it should subtract from eraser value only if a non-whitespace character is encountered", () => {
      pencil.erase("fun but", blankPaper);
      expect(pencil.eraser).toBe(38);
    });
  });
  describe("Pencil throws error when trying to erase with no eraser value left", () => {
    const pencil = new Pencil({eraser: 0});
    const erase = "TDD is fun but perfecting TDD is more fun!"; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(erase, blankPaper);
    
    test("it shouldn't erase given word due to not enough eraser value and throw correct error", () => {
      expect(() => {pencil.erase("fun", blankPaper)}).toThrow("No more eraser left! Time to get a new pencil!");
    });
  });
  describe("Pencil should stop erasing in middle of word if eraser value runs out in the middle of word", () => {
    const pencil = new Pencil({eraser: 2});
    const erase = "TDD is fun but perfecting TDD is more fun!"; // counts 11 characters, 6 for capital, 5 for lowercase
    const blankPaper = new Paper();
    pencil.write(erase, blankPaper);
    pencil.erase("fun", blankPaper)
    test("it shouldn't erase given word due to not enough eraser value and throw correct error", () => {
      expect(blankPaper.text).toBe("TDD is fun but perfecting TDD is more   n!");
    });
  });
});

describe("Edit method", () => {
  describe("If nothing has been previously erased an error will be thrown", () => {
    const pencil = new Pencil();
    const mantra = "An apple a day keeps the doctor away"; // 30 characters, 1 capital 28 lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper); 

    test("it should add 'onion' to blankPaper in space left from erasing 'apple' previously", () => {
      expect(() => {pencil.edit("onion", blankPaper)}).toThrow("Nothing has been previously erased to add new text to");
    });
  });
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
    const pencil = new Pencil({point: 35});
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
  describe("Pencil can handle multiple edits to once sentence", () => {
    const pencil = new Pencil(50);
    const mantra = "TDD is fun but perfecting TDD is more fun!"; // 30 characters, 1 capital 28 lowercase
    const blankPaper = new Paper();
    pencil.write(mantra, blankPaper);
    pencil.erase("fun", blankPaper); // Should take away 5 from eraser
    pencil.erase("TDD", blankPaper);
    test("it should return the sentence with the last 'fun' missing and the last 'TDD' missing", () => {
      expect(blankPaper.text).toBe("TDD is fun but perfecting     is more    !");
    });
    test("it should return the sentence with the last 'TDD' replaced with 'you'", () => {
      pencil.edit("you", blankPaper); // Should take away 9 from pencil point
      expect(blankPaper.text).toBe("TDD is fun but perfecting you is more    !");
    });
    test("it should return the sentence with the last 'fun' replaced with 'yay'", () => {
      pencil.edit("yay", blankPaper);
      expect(blankPaper.text).toBe("TDD is fun but perfecting you is more yay!");
    });
  });
  describe("EditWrite method", () => {
    describe("Edit write method takes into account capital/lowercase letters and whitespace when edit method is called", () => {
      const pencil = new Pencil({size: 10});
      const mantra = "An apple a day keeps the doctor away"; // 30 characters, 1 capital 28 lowercase 50 point, 20 left
      const blankPaper = new Paper();
      pencil.write(mantra, blankPaper);
      pencil.erase("apple a day", blankPaper); // Should take away 9 from eraser
      pencil.edit("onion a mni", blankPaper); // Should take away 9 from pencil point, 11

      test("it should add 'onion a mni' to space left when apple a day", () => {
        expect(blankPaper.text).toBe("An onion a mni keeps the doctor away");
      });
      test("it should degrade pencil point by correct amount when adding new word to paper", () => {
        expect(pencil.point).toBe(11);
      });
      test("it should degrade eraser by correct amount when erasing word from paper", () => {
        expect(pencil.eraser).toBe(41);
      });
      test("it should degrade point for capital letters", () => {
        pencil.erase("mni", blankPaper);
        pencil.edit("MIN", blankPaper)
        expect(pencil.point).toBe(5);
        expect(pencil.eraser).toBe(38);
      });
    });
  });
});