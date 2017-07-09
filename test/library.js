'use strict';

let {
    translator
} = require('..');

let {
    getAllLeafs
} = require('../library/js');

let {
    parse
} = require('pfc-idl');

let assert = require('assert');

describe('library', () => {
    it('getAllLeafs:base', () => {
        let code = translator(parse('M1(a, b, c) -> Model'));
        assert.deepEqual(eval(`${code}\nvar m1 = new M1(1, 2, 3);getAllLeafs(m1);`), [1, 2, 3]);
    });

    it('getAllLeafs:next', () => {
        let code = translator(parse('M1(a, b, c) -> Model\nM2(d, M1 f) -> Model'));
        assert.deepEqual(eval(`${code}\nvar m1 = new M1(1, 2, 3);var m2 = new M2(4, m1);getAllLeafs(m2);`), [4, 1, 2, 3]);
    });

    it('getAllLeafs:order', () => {
        let code = translator(parse('Pair(v1, v2) -> Model\nM1(a, b) -> Model'));
        assert.deepEqual(eval(`${code}\nvar p = new Pair(new Pair(1, 2), new Pair(3, 4)); getAllLeafs(p);`), [1, 2, 3, 4]);
    });

    it('getAllLeafs:branchClasses', () => {
        let code = translator(parse('Pair(v1, v2) -> Model\nM1(a, b) -> Model'));
        assert.deepEqual(eval(`${code}\nvar p = new Pair(new Pair(1, 2), new Pair(3, new M1(4, 5))); let ret = getAllLeafs(p, {branchClasses: ['Pair']});ret[3] = getAllLeafs(ret[3]);ret`), [1, 2, 3, [4, 5]]);
    });
});
