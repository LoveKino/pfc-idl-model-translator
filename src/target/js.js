'use strict';

let {
    upperFirstLetter,
    commaParamsStr
} = require('../util');

let modelConstructor = (funName, params) => {
    return `
// construcor for ${funName}
var ${funName} = function(${commaParamsStr(params)}) {
    ${params.map(({name}) => {
        return `this.${name} = ${name};`;
    }).join('\n    ')}
};`;
};

let modelGetsCode = (funName, params) => {
    return params.map(({name}) => {
        return modelGetCode(funName, name);
    }).join('\n');
};

let modelGetCode = (funName, paramName) => {
    return `
// get method for attribute ${paramName}
${funName}.prototype.get${upperFirstLetter(paramName)} = function() {
    return this.${paramName};
};`;
};

let modelSetsCode = (funName, params) => {
    return params.map(({name}) => {
        return modelSetCode(funName, name);
    }).join('\n');
};

let modelSetCode = (funName, paramName) => {
    return `
// set method for attribute ${paramName}
${funName}.prototype.set${upperFirstLetter(paramName)} = function(v) {
    this.${paramName} = v;
};`;
};

let modelEqualsCode = (funName, params) => {
    return params.map(({name}) => {
        return modelEqualCode(funName, name);
    }).join('\n');
};

let modelEqualCode = (funName, paramName) => {
    return `
// equal method for attribute ${paramName}
${funName}.prototype.equal${upperFirstLetter(paramName)} = function(v) {
    return this.${paramName} === v;
};`;
};

module.exports = {
    modelConstructor,
    modelGetsCode,
    modelSetsCode,
    modelEqualsCode
};
