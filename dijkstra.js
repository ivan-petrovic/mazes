"use strict";

const DistanceGrid = require('./distance_grid');
const BinaryTree = require('./binary_tree');

let grid = new DistanceGrid(5, 5);
BinaryTree.on(grid);

let start = grid.lookup(0, 0);
let distances = start.distances();

grid.distances = distances;
console.log(String(grid));

grid.distances = distances.path_to(grid.lookup(grid.rows - 1, 0));
console.log("path from northwest corner to southwest corner:");
console.log(String(grid));
