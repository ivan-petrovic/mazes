let assert = require('assert');
const Cell = require('../cell');

let cell = new Cell(1, 2);
let cell2 = new Cell(2, 2);

describe('Cell', function() {
  
    it('#constructor should initialize member variables', function() {
        assert.equal(cell.row, 1);
        assert.equal(cell.column, 2);
        assert.equal(Object.keys(cell.links).length === 0 && cell.links.constructor === Object, true);

        assert.equal(cell.north === null, true);
        assert.equal(cell.south === null, true);
        assert.equal(cell.east === null, true);
        assert.equal(cell.west === null, true);
    });

    it('#link should link cells', function() {
        assert.equal(cell.isLinked(null), false);

        assert.equal(cell.isLinked(cell2), false);

        cell.link(cell2);
        assert.equal(cell.isLinked(cell2), true);
        assert.equal(cell2.isLinked(cell), true);

        cell2.unlink(cell);
        assert.equal(cell.isLinked(cell2), false);
        assert.equal(cell2.isLinked(cell), false);
    });

});
