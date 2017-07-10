'use strict';

let {
    translator
} = require('..');

let {
    parse
} = require('pfc-idl');

let assert = require('assert');

describe('index', () => {
    it('base', () => {
        let code = translator(parse('M1(a, b, c) -> Model'));

        // get
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.getA();`), 1);
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.getB();`), 2);
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.getC();`), 3);

        // set
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.setA(20);m1.getA()`), 20);
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.setB(9);m1.getB()`), 9);
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.setC(123);m1.getC()`), 123);

        // equal
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.equalA(1)`), true);
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.equalA(2)`), false);
    });

    it('nest', () => {
        let code = translator(parse('M1(a, b, c) -> Model\nM2(e, M1 f) -> Model'));

        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nvar m2 = M2(1, m1);m2.getF().getA()`), 1);
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);\nvar m2 = M2(1, m1);m2.getF().getB()`), 2);
    });

    it('params', () => {
        let code = translator(parse('M1(a, b, c) -> Model'));

        // params
        assert.deepEqual(eval(`${code}\nvar m1 = M1(1, 2, 3);\nm1.setA(10)\nm1.params();`), [10, 2, 3]);
    });

    it('isModel', () => {
        let code = translator(parse('M1(a, b, c) -> Model'));

        // params
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);m1.instanceModel`), true);
    });

    it('funName', () => {
        let code = translator(parse('M1(a, b, c) -> Model'));

        // params
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);m1.className`), 'M1');
    });

    it('model contant', () => {
        let code = translator(parse('M1(a, b, c) -> Model'));

        // params
        assert.equal(eval(`${code}\nvar m1 = M1(1, 2, 3);MODEL_CLASS_NAME_M1`), 'M1');
    });
});
