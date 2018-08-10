let assert = require('assert');
const Cell = require('../cell');
const Distances = require('../distances');

let cell1 = new Cell(0, 0);
let cell2 = new Cell(2, 5);
let distances = new Distances(cell1);

describe('Distances', function() {
    it('#constructor should set distance to root cell to 0', function() {
        assert.equal(distances.lookup(cell1), 0);
        // if(distances.lookup(cell1)) console.log(distances.lookup(cell1)); else { console.log('Ovo ne treba da stampa'); console.log(distances.lookup(cell1));}
    });

    it('#exists should check if distance for cell is defined', function() {
        assert.equal(distances.exists(cell1), true);
        assert.equal(distances.exists(cell2), false);
        distances.store(cell2, 10);
        assert.equal(distances.exists(cell2), true);
    });

    it('#store should save distance of cell', function() {
        distances.store(cell2, 11);
        assert.equal(distances.lookup(cell2), 11);
    });

});
