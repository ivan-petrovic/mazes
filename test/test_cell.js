let assert = require('assert');
const Cell = require('../src/core/cell');

let cell1, cell2, cell3;

describe('Cell', function() {
    
    beforeEach(function() {
        cell1 = new Cell(1, 2);
        cell2 = new Cell(2, 2);
        cell3 = new Cell(1, 3);
    });

    it('#constructor should initialize member variables', function() {
        assert.equal(cell1.row, 1);
        assert.equal(cell1.column, 2);
        assert.equal(cell1.empty_links, true);

        assert.equal(cell1.north === null, true);
        assert.equal(cell1.south === null, true);
        assert.equal(cell1.east === null, true);
        assert.equal(cell1.west === null, true);
    });

    it('#link should link cells (bidirectional)', function() {
        assert.equal(cell1.is_linked(null), false);
        assert.equal(cell1.is_linked(cell2), false);

        cell1.link(cell2);
        assert.equal(cell1.is_linked(cell2), true);
        assert.equal(cell2.is_linked(cell1), true);
    });

    it('#unlink should unlink cells (bidirectional)', function() {
        cell1.link(cell2);
        assert.equal(cell1.is_linked(cell2), true);
        assert.equal(cell2.is_linked(cell1), true);

        cell2.unlink(cell1);
        assert.equal(cell1.is_linked(cell2), false);
        assert.equal(cell2.is_linked(cell1), false);
    });

    it('#link should link cells (unidirectional)', function() {
        assert.equal(cell1.is_linked(cell2), false);

        cell1.link(cell2, false);
        assert.equal(cell1.is_linked(cell2), true);
        assert.equal(cell2.is_linked(cell1), false);
    });

    it('#unlink should unlink cells (unidirectional)', function() {
        cell1.link(cell2, false);
        assert.equal(cell1.is_linked(cell2), true);
        assert.equal(cell2.is_linked(cell1), false);

        cell1.unlink(cell2, false);
        assert.equal(cell1.is_linked(cell2), false);
        assert.equal(cell2.is_linked(cell1), false);
    });

    it('#link reapeated calls should not duplicate link', function() {
        assert.equal(cell1.num_of_links, 0);

        cell1.link(cell2, false);
        assert.equal(cell1.num_of_links, 1);
        assert.equal(cell2.num_of_links, 0);

        cell1.link(cell2);
        assert.equal(cell1.num_of_links, 1);
        assert.equal(cell2.num_of_links, 1);
    });

    it('#linked should return array of linked cells', function() {
        cell1.link(cell2);          // link cell1 to cell2, and vice versa
        cell1.link(cell3, false);   // link cell1 to cell3, but NOT vice versa

        assert.equal(cell1.linked_cells.length, 2);
        assert.equal(cell2.linked_cells.length, 1);
        assert.equal(cell3.linked_cells.length, 0);
    });

    it('#num_of_links should return number of linked cells', function() {
        cell1.link(cell2);          // link cell1 to cell2, and vice versa
        cell1.link(cell3, false);   // link cell1 to cell3, but NOT vice versa

        assert.equal(cell1.num_of_links, 2);
        assert.equal(cell2.num_of_links, 1);
        assert.equal(cell3.num_of_links, 0);
    });

    it('#empty_links should return whether cell has linked cells', function() {
        assert.equal(cell1.empty_links, true);
        cell1.link(cell2);

        assert.equal(cell1.empty_links, false);
        assert.equal(cell2.empty_links, false);
    });

    it('#neighbors initialy neighbor list should be empty', function() {
        assert.equal(cell1.neighbors.length, 0);
    });

    it('#neighbors should return list of cell neighbors', function() {
        cell1.north = cell2;
        cell1.east = cell3;
        assert.equal(cell1.neighbors.length, 2);
    });

    it('#sample_neighbor should return null if neighbor list is empty', function() {
        let cell = cell1.sample_neighbor;
        assert.equal(cell, null);
    });

    it('#sample_neighbor should return only neighbor if cell has one neighbor', function() {
        cell1.east = cell3;
        assert.equal(cell1.sample_neighbor, cell3);
    });

    it('#sample_neighbor should return random neighbor of cell', function() {
        cell1.north = cell2;
        cell1.east = cell3;
        let neighbor = cell1.sample_neighbor;
        assert.equal(neighbor == cell2 || neighbor == cell2, true);
    });

});
