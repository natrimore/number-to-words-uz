languages = ["uzCyril", "uzLatin"];

let i18n = {
  uzCyril: require("./i18n/uz-cyril.json"),
  uzLatin: require("./i18n/uz-latin.json"),
};

const writtenNumber = {
  lang: "uzCyril",
};

exports.i18n = i18n;

let numberToWordsUz = {};

let langId;

numberToScalesUz = (num) => {
  let number = num.toString();
  let isMinusExists = false;
  if (checkIfExistsMinus(number)) {
    console.log(111);
    isMinusExists = true;
    number = number.replace("-", "");
  }
  const numberLength = number.length;
  const numberScales = Math.ceil(numberLength / 3);
  const numberLengthGoal = numberScales * 3;
  const lackOfDigits = numberLengthGoal - numberLength;
  const extendedNumber = "0".repeat(lackOfDigits) + number;
  let cutNumber = [];

  if (isMinusExists) {
    cutNumber.push("-");
  }

  for (let i = 0; i < extendedNumber.length; i += 3) {
    const digit1 = extendedNumber[i];
    const digit2 = extendedNumber[i + 1];
    const digit3 = extendedNumber[i + 2];
    const digits = digit3 + digit2 + digit1;
    cutNumber.push(digits);
  }
  return cutNumber.reverse();
};

checkIfExistsMinus = (number) => {
  return number[0] == "-" ? true : false;
};

convertScalesToWordsUz = (numberArr, options) => {
  options = options || {};
  options = defaults(options, writtenNumber);

  langId =
    typeof options.lang === "string" ? i18n[options.lang] : options.lang;

  if (!langId) {
    if (langId.indexOf(writtenNumber.lang) < 0) {
      writtenNumber.lang = "uzCyril";
    }
    langId = i18n[writtenNumber.lang];
  }

  convertedResult = "";
  let isMinus = false;
  if (numberArr[numberArr.length - 1] == "-") {
    isMinus = true;
    numberArr.splice(-1, 1);
  }
  numberArr.forEach((element, index) => {
    const digit1 = parseInt(element[0]);
    const digit2 = parseInt(element[1]);
    const digit3 = parseInt(element[2]);
    const unitName = langId.units[index];
    let hundredUnitName = "";
    let digit1text = "";
    let digit2text = "";
    let digit3text = "";
    if (digit1 === 0 && digit2 === 0 && digit3 === 0) {
      return;
    }
    digit1text = langId.numberNames[0][digit1];
    digit2text = langId.numberNames[1][digit2];
    if (digit3 !== 0) {
      hundredUnitName = langId.numberNames[2][2];
    }
    digit3text = langId.numberNames[0][digit3];

    const isunitName =
      index !== 0 && !(digit1 === 0 && digit2 === 0 && digit3 === 0);
    const scaleResult = `${digit3text} ${hundredUnitName} ${digit2text} ${digit1text} ${
      isunitName ? unitName : ""
    }`
      .replace(/\s+/g, " ")
      .trim();
    convertedResult = `${scaleResult} ${convertedResult}`;
  });
  if (isMinus) {
    convertedResult = `${langId.minus} ${convertedResult}`;
  }
  return convertedResult;
};

defaults = (target, defs) => {
  if (target == null) target = {};
  let ret = {};
  let keys = Object.keys(defs);

  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i];
    ret[key] = target[key] || defs[key];
  }

  return ret;
};

numberToWordsUz.convert = function (number, options = {}) {
  number = number.toString();

  let beforedot = number;
  
  let afterdot = null;
  
  if (number.indexOf(".") !== -1) {
    [beforedot, afterdot] = number.split('.');
  }
  else if (number.indexOf(",") !== -1) {
    [beforedot, afterdot] = number.split(',');
  }

  let convertedResult;
  
  const beforedots = numberToScalesUz(beforedot)   
  
  let beforedotConvert = convertScalesToWordsUz(beforedots, options);

  convertedResult = beforedotConvert.trim();

  if (afterdot !== null) {
    const afterdots = numberToScalesUz(afterdot);

    let afterdotConvert = convertScalesToWordsUz(afterdots, options);

    convertedResult = `${convertedResult} ${langId.point} ${afterdotConvert.trim()}`;
  }
  
  return convertedResult;
};

module.exports = numberToWordsUz;
