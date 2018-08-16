"use strict";

const Grid = require('../core/grid');
const Wilsons = require('../algorithms/wilsons');

let grid = new Grid(15, 15);
Wilsons.on(grid);

console.log(String(grid));
