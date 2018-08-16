let assert = require('assert');
const Distances = require('../src/core/distances');
const Cell = require('../src/core/cell');

let cell1, cell2, distances;

describe('Distances', function() {
    beforeEach(function() {
        cell1 = new Cell(0, 0);
        cell2 = new Cell(2, 5);
        distances = new Distances(cell1);
    });

    it('#constructor should initialize member variables', function() {
        assert.equal(distances.distance_of(cell1), 0);
        assert.equal(distances.cells[cell1._hash()], distances.root);
    });

    it('#exists should check if distance for cell is defined', function() {
        assert.equal(distances.exists(cell1), true);
        assert.equal(distances.exists(cell2), false);
        distances.store(cell2, 10);
        assert.equal(distances.exists(cell2), true);
    });

    it('#store should save distance of cell', function() {
        distances.store(cell2, 11);
        assert.equal(distances.distance_of(cell2), 11);
        assert.equal(distances.cells[cell2._hash()], cell2);
    });

});
