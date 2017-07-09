'use strict';

const MODEL = 'Model';

let jsTarget = require('./target/js');

/**
 * translate model IDL
 */

let translator = (modelPfcIdAst, target = 'js') => {
    let targetCode = '';

    for (let funName in modelPfcIdAst) {
        let {
            params, parser
        } = modelPfcIdAst[funName];

        let {
            type
        } = parser;

        if (type === MODEL) {
            // translate to model
            targetCode += translateModelIDL(funName, params, target);
        }
    }

    return targetCode;
};

let translateModelIDL = (funName, params, target) => {
    return modelConstructor(funName, params, target) +
        modelGetsCode(funName, params, target) +
        modelSetsCode(funName, params, target) +
        modelEqualsCode(funName, params, target) +
        modelMetaCode(funName, params, target);
};

let modelConstructor = (funName, params, target) => {
    if (target === 'js') {
        return jsTarget.modelConstructor(funName, params);
    }

    return '';
};

let modelGetsCode = (funName, params, target) => {
    if (target === 'js') {
        return jsTarget.modelGetsCode(funName, params);
    }

    return '';
};

let modelSetsCode = (funName, params, target) => {
    if (target === 'js') {
        return jsTarget.modelSetsCode(funName, params);
    }

    return '';
};

let modelEqualsCode = (funName, params, target) => {
    if (target === 'js') {
        return jsTarget.modelEqualsCode(funName, params);
    }

    return '';
};

let modelMetaCode = (funName, params, target) => {
    if (target === 'js') {
        return jsTarget.modelMetaCode(funName, params);
    }

    return '';
};

module.exports = {
    translator,
    translateModelIDL
};
