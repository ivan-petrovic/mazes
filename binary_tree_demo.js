"use strict";

const Grid = require('./grid');
const BinaryTree = require('./binary_tree');

let grid = new Grid(5, 5);
BinaryTree.on(grid);

console.log(String(grid));
