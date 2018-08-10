"use strict";

const Grid = require('./grid');

class DistanceGrid extends Grid {
    constructor(rows, columns) {
        super(rows, columns);
        this.distances = null;
    }

    contents_of(cell) {
        if (this.distances && this.distances.exists(cell)) {
            return ("  " + this.distances.lookup(cell)).slice(-3);
        } else {
            return super.contents_of(cell);
        }
    }
}

module.exports = DistanceGrid;