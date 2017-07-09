'use strict';

let {
    upperFirstLetter,
    commaParamsStr
} = require('../util');

let modelConstructor = (funName, params) => {
    return `
// construcor for ${funName}
var ${funName} = function(${commaParamsStr(params)}) {
    this._params = [${commaParamsStr(params)}];
};`;
};

let modelGetsCode = (funName, params) => {
    return params.map(({name}, index) => {
        return modelGetCode(funName, name, index);
    }).join('\n');
};

let modelGetCode = (funName, paramName, index) => {
    return `
// get method for attribute ${paramName}
${funName}.prototype.get${upperFirstLetter(paramName)} = function() {
    return this._params[${index}];
};`;
};

let modelSetsCode = (funName, params) => {
    return params.map(({name}, index) => {
        return modelSetCode(funName, name, index);
    }).join('\n');
};

let modelSetCode = (funName, paramName, index) => {
    return `
// set method for attribute ${paramName}
${funName}.prototype.set${upperFirstLetter(paramName)} = function(v) {
    this._params[${index}] = v;
};`;
};

let modelEqualsCode = (funName, params) => {
    return params.map(({name}, index) => {
        return modelEqualCode(funName, name, index);
    }).join('\n');
};

let modelEqualCode = (funName, paramName, index) => {
    return `
// equal method for attribute ${paramName}
${funName}.prototype.equal${upperFirstLetter(paramName)} = function(v) {
    return this._params[${index}] === v;
};`;
};

let modelMetaCode = (funName) => {
    return `
// some meta methods for model ${funName}
${funName}.prototype.params = function() {
    return this._params;
};
${funName}.prototype.instanceModel = true;
${funName}.prototype.className = "${funName}";
`;
};

module.exports = {
    modelConstructor,
    modelGetsCode,
    modelSetsCode,
    modelEqualsCode,
    modelMetaCode
};
