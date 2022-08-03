let logic = require("../js/logic.js");

describe("Testing getObjectFromArray", () => {
  test("Should return an object that match both given key and value", () => {
    let array = [
      { id: 1, name: "mohammed" },
      { id: 2, name: "khalil" },
      { id: 3, name: "ahmed" },
    ];
    expect(logic.getObjectFromArray(array, "id", 2)).toEqual({ id: 2, name: "khalil" });
  });
});

describe("Testing toThreeDigit", () => {
  test("Should return a 3 digits formatted number", () => {
    expect(logic.toThreeDigit(3)).toEqual("003");
  });
});
