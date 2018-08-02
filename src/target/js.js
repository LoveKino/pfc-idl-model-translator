'use strict';

let {
    upperFirstLetter,
    commaParamsStr
} = require('../util');

let modelConstructor = (funName, params) => {
    return `// construcor for ${funName}
var ${funName} = function(${commaParamsStr(params)}) {
    return new ${getPrivateClassName(funName)}(${commaParamsStr(params)});
};
// private inner class
var ${getPrivateClassName(funName)} = function(${commaParamsStr(params)}) {
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
${getProto(funName)}.get${upperFirstLetter(paramName)} = function() {
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
${getProto(funName)}.set${upperFirstLetter(paramName)} = function(v) {
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
${getProto(funName)}.equal${upperFirstLetter(paramName)} = function(v) {
    return this._params[${index}] === v;
};`;
};

let modelMetaCode = (funName) => {
    return `
// some meta methods for model ${funName}
${getProto(funName)}.params = function() {
    return this._params;
};
${getProto(funName)}.instanceModel = true;
var ${getModelConstantVariableName(funName)} = '${funName}';
${getProto(funName)}.className = ${getModelConstantVariableName(funName)};
`;
};

let getModelConstantVariableName = (funName) => {
    return `MODEL_CLASS_NAME_${funName.toUpperCase()}`;
};

let getProto = (funName) => `${getPrivateClassName(funName)}.prototype`;

let getPrivateClassName = (funName) => `_${funName}`;

module.exports = {
    modelConstructor,
    modelGetsCode,
    modelSetsCode,
    modelEqualsCode,
    modelMetaCode
};
