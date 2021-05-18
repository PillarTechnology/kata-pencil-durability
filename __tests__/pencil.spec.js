const Pencil = require("../kata/pencil.js");

describe("Pencil creator", () => {
    test("Pencil constructor should create a new pencil object with passed in properties", () => {
      const pencil = new Pencil(100, 10, 20);
      expect(pencil.point).toBe(100);
      expect(pencil.size).toBe(10);
      expect(pencil.eraser).toBe(20);
    });
  });