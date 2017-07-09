'use strict';

/**
 * general library for model
 */

let isModel = (v) => v && typeof v === 'object' && v.instanceModel;

let isClassName = (v, type) => v && typeof v === 'object' && v.className === type;

/**
 * In a model tree, find all leafs of this model tree
 */
let getAllLeafs = (root, {
    branchClasses = []
} = {}) => {
    if (!root) return [];
    if(!isModel(root)) return [root];
    let leafs = [];
    let queue = [root];


    let branchClassMap = null;
    let branchClassesLen = branchClasses.length;
    if (branchClassesLen) {
        branchClassMap = {};
        for (let k = 0; k < branchClassesLen; k++) {
            branchClassMap[branchClasses[k]] = 1;
        }
    }

    while (queue.length) {
        let top = queue.shift();
        let children = top.params();
        let childLen = children.length;
        if (childLen) {
            for (let i = 0; i < childLen; i++) {
                let child = children[i];
                if (isModel(child)) {
                    if (branchClassMap && !branchClassMap[child.className]) {
                        leafs.push(child);
                    } else {
                        queue.push(child);
                    }
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
    getAllLeafs,
    isModel,
    isClassName
};
