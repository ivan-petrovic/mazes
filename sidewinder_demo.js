"use strict";

const Grid = require('./grid');
const Sidewinder = require('./sidewinder');

let grid = new Grid(4, 4);
Sidewinder.on(grid);

console.log(String(grid));
// process.stdout.write(String(grid));
