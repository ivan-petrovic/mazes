"use strict";

// import Cell from './cell';
const Cell = require('./cell');

class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;

        this.grid = this._prepare_grid();
        this._configure_cells();
    }

    _prepare_grid() {
        return Array.apply(null, new Array(this.rows)).map((currElement, row) => {
            return Array.apply(null, new Array(this.columns)).map((currElement, column) => {
                return new Cell(row, column);
            });
        });
    }

    _configure_cells() {
        let cells = this.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            let cell = value;
            let row = cell.row;
            let col = cell.column;
            cell.north = this.cell_at(row + 1, col);
            cell.south = this.cell_at(row - 1, col);
            cell.west = this.cell_at(row, col - 1);
            cell.east = this.cell_at(row, col + 1);
        }
    }

    cell_at(row, column) {
        if (row < 0 || row > this.rows - 1) return null;
        if (column < 0 || column > this.grid[row].length - 1) return null;
        return this.grid[row][column];
    }

    get random_cell() {
        let row = Math.floor(Math.random() * this.rows);
        let column = Math.floor(Math.random() * this.grid[row].length);
        return this.grid[row][column];
    }

    get size() {
        return this.rows * this.columns;
    }

    * each_row() {
        yield* this.grid;
    }
    
    * each_cell() {
        let rows = this.each_row();
        let value, done;
    
        while({value, done} = rows.next(), !done) {
            if (value) yield* value;
        }
    }

    for_each_cell(func) {
        let cells = this.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            func(value);    // value is next cell in grid
        }
    }

    for_each_row(func) {
        let rows = this.each_row();
        let value, done;
        
        while({value, done} = rows.next(), !done) {
            func(value);    // value is next row in grid
        }
    }

    toString() {
        let output = "+" + "---+".repeat(this.columns) + "\n";

        for (let k = this.grid.length - 1; k > -1; k -= 1) {
            let row = this.grid[k];

            let top = "|";
            let bottom = "+";
            
            row.forEach(cell => {
                if (!cell) cell = new Cell(-1, -1);

                let body = this.contents_of(cell);
                let east_boundary = (cell.is_linked(cell.east) ? " " : "|");
                top += body + east_boundary;
                
                // three spaces below, too >>----------------->> >...<
                let south_boundary = (cell.is_linked(cell.south) ? "   " : "---");
                let corner = "+";
                bottom += south_boundary + corner;
            });

            output += top + "\n";
            output += bottom + "\n";
         }

         return output;
    }

    contents_of(cell) {
        return "   "; // <-- that's THREE (3) spaces!
    }

    get deadends() {
        let list = [];
        this.for_each_cell((cell) => {
            if (cell.num_of_links == 1) list.push(cell);
        });
        return list;
    }

    print() {
        let cells = this.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            value.print();
        }
    }
}

module.exports = Grid;
