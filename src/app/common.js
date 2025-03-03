export const add = (enteredNumbers) => {
    const negativeNumbers = enteredNumbers.filter(num => num < 0);
    if (negativeNumbers.length) {
        throw new Error(`Negative numbers detected: ${negativeNumbers.join(',').split(',').join(', ')}. No negative numbers are allowed!`);
    };

    console.log("enteredNumbers", enteredNumbers)

    let addition = enteredNumbers.reduce((a, b) => a + b).toString()
    console.log("addition", addition)


    return addition;

}
export const getDelimiter = (delimiterSettings, altDelimiter) => {
    const customDelimiter = getCustomDelimiter(delimiterSettings);
    console.log("getCustomDelimiter", customDelimiter)

    return [...altDelimiter, customDelimiter];
}

export const getCustomDelimiter = delimiterSettings => {
    if (delimiterSettings.slice(0, 2) === '//' && delimiterSettings.length === 3) {
        return delimiterSettings.slice(2);
    } else {
        return ',';
    };
};

export const getValues = (inputString, delimiters) => {

    let strings = inputString.split(',');
    delimiters.forEach(delimiter => {
        strings = strings.join(',').split(delimiter)
    });
    strings = strings.join(',').split(',').filter(string => string !== '');
    const nums = strings.map(getNum);
    return nums;
};

export const getNum = val => {
    const num = Number(val);
    if (isNaN(num)) {
        return 0;
    };
    return num;
};