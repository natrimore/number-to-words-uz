const numberToWordsUz = require("../src/index.js");

describe("check number convers", () => {
  test("convert", () => {
    expect(numberToWordsUz.convert(4564)).toBe(
      `to'rt ming besh yuz oltmish to'rt`
    );
    expect(numberToWordsUz.convert(5024)).toBe(`besh ming yigirma to'rt`),
      expect(numberToWordsUz.convert(1000011)).toBe(`bir million o'n bir`);
  });
});

describe("minus number convert", () => {
  test("minus word", () => {
    expect(numberToWordsUz.convert(-554)).toBe(`minus besh yuz ellik to'rt`);
  });
});
