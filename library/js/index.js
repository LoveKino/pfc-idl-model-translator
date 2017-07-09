'use strict';

/**
 * general library for model
 */

let isModel = (v) => v && typeof v === 'object' && v.instanceModel;

/**
 * In a model tree, find all leafs of this model tree
 */
let getAllLeafs = (root) => {
    let leafs = [];
    if (!root) return leafs;
    let stack = [root];

    while (stack.length) {
        let top = stack.pop();
        let children = top.params();
        let childLen = children.length;
        if (childLen) {
            for (let i = 0; i < childLen; i++) {
                let child = children[i];
                if (isModel(child)) {
                    stack.push(child);
                } else {
                    leafs.push(child);
                }
            }
        } else {
            leafs.push(top);
        }
    }

    return leafs;
};

module.exports = {
    getAllLeafs
};
