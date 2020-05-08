languages = ['uzCyril', 'uzLatin'];

let i18n = {
    uzCyril: require('./i18n/uz-cyril.json'),
    uzLatin: require('./i18n/uz-latin.json')
};

const writtenNumber = {
    lang: 'uzCyril'
}

exports.i18n = i18n;

let numberToWordsUz = {};

const textValues = {
    minus: 'minus',
    numberNames: [
        ['', 'bir', 'ikki', 'uch', `to'rt`, 'besh', 'olti', 'yetti', 'sakkiz', `to'qqiz`],
        ['', `o'n`, 'yigirma', `o'ttiz`, `qirq`, `ellik`, `oltmish`, `yetmish`, `sakson`, `to'qson`],
        ['', '', 'yuz']
    ],
    units: ['', 'ming', 'million', 'milliard']
    
}

numberToScalesUz = (num) => {
    const number = num.toString();
    const numberLength = number.length;
    const numberScales = Math.ceil(numberLength / 3);
    const numberLengthGoal = numberScales * 3;
    const lackOfDigits = numberLengthGoal - numberLength;
    const extendedNumber = '0'.repeat(lackOfDigits) + number;
    let cutNumber = [];
    for(let i = 0; i < extendedNumber.length; i += 3) {
        const digit1 = extendedNumber[i];
        const digit2 = extendedNumber[i+1];
        const digit3 = extendedNumber[i+2];
        const digits = digit3 + digit2 + digit1;
        cutNumber.push(digits);
    }
    return cutNumber.reverse();
}

convertScalesToWordsUz = (numberArr, options) =>  {
    options = options || {};
    options = defaults(options, writtenNumber);

    let language = typeof options.lang === 'string'
        ? i18n[options.lang]
        : options.lang;

    if (!language) {
        if (languages.indexOf(writtenNumber.lang) < 0) {
            writtenNumber.lang = "en";
        }
        language = i18n[writtenNumber.lang];
    }

    convertedResult = '';
    numberArr.forEach((element, index) => {
        const digit1 = parseInt(element[0]);
        const digit2 = parseInt(element[1]);
        const digit3 = parseInt(element[2]);
        const unitName = language.units[index];
        let hundredUnitName = '';
        let digit1text = '';
        let digit2text = '';
        let digit3text = '';
        if (digit1 === 0 && digit2 === 0 && digit3 === 0){
            return;
        }
        digit1text = language.numberNames[0][digit1];
        digit2text = language.numberNames[1][digit2];
        if (digit3 !== 0) {
            hundredUnitName = language.numberNames[2][2];
        }
        digit3text = language.numberNames[0][digit3];
        
        const isunitName = index !== 0 && !(digit1 === 0 && digit2 === 0 && digit3 === 0);
        const scaleResult = `${digit3text} ${hundredUnitName} ${digit2text} ${digit1text} ${isunitName ? unitName : ''}`.replace(/\s+/g,' ').trim(); 
        convertedResult = `${scaleResult} ${convertedResult}`;
    });

    return convertedResult;
}

defaults = (target, defs) => {
    if (target == null) target = {};
    let ret = {};
    let keys = Object.keys(defs);

    for(let i = 0, len = keys.length; i < len; i++) {
        let key = keys[i];
        ret[key] = target[key] || defs[key];
    }

    return ret;
}

numberToWordsUz.convert = function(number, options = {}) {
    const numberArr = numberToScalesUz(number);

    let convertedResult = convertScalesToWordsUz(numberArr, options);

    return convertedResult.trim();
}

module.exports = numberToWordsUz;
