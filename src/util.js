'use strict';

let upperFirstLetter = (str) => {
    let arr = str.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
};

let commaParamsStr = (params) => {
    let paramsStr = params.map(({
        name
    }) => name).join(', ');

    return paramsStr;
};

module.exports = {
    upperFirstLetter,
    commaParamsStr
};
