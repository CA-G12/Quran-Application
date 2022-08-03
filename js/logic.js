function getObjectFromArray(arrayOfObj, key, value) {
  return arrayOfObj.find((obj) => obj[key] == value);
}

function toThreeDigit(num) {
  return num < 10 ? "00" + num : num < 100 ? "0" + num : "" + num;
}

module.exports = {
  getObjectFromArray,
  toThreeDigit,
};
