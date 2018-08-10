"use strict";

// import Cell from './cell';
const Cell = require('./cell');

class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.prepare_grid();
        this.configure_cells();
    }

    prepare_grid() {
        return Array.apply(null, new Array(this.rows)).map((currElement, row) => {
            return Array.apply(null, new Array(this.columns)).map((currElement, column) => {
                return new Cell(row, column);
            });
        });
    }

    configure_cells() {
        let cells = this.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            let cell = value;
            let row = cell.row;
            let col = cell.column;
            cell.north = this.lookup(row + 1, col);
            cell.south = this.lookup(row - 1, col);
            cell.west = this.lookup(row, col - 1);
            cell.east = this.lookup(row, col + 1);
        }
    }

    lookup(row, column) {
        if(row < 0 || row > this.rows - 1) return null;
        if(column < 0 || column > this.grid[row].length - 1) return null;
        return this.grid[row][column];
    }

    random_cell() {
        let row = Math.floor(Math.random() * this.rows);
        let column = Math.floor(Math.random() * this.grid[row].length);
        return this.grid[row][column];
    }

    size() {
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

    toString() {
        let output = "+" + "---+".repeat(this.columns) + "\n";

        for (let k = this.grid.length - 1; k > -1; k -= 1) {
            let rows = this.grid[k];

            let top = "|";
            let bottom = "+";
            rows.forEach(cell => {
                if(!cell) cell = new Cell(-1, -1);

                // let body = "   "; // <-- that's THREE (3) spaces!
                let body = this.contents_of(cell);
                let east_boundary = (cell.isLinked(cell.east) ? " " : "|");
                top += body + east_boundary;
                
                // three spaces below, too >>----------------->> >...<
                let south_boundary = (cell.isLinked(cell.south) ? "   " : "---");
                let corner = "+";
                bottom += south_boundary + corner;

                // console.log("Printing cell: " + cell.row + ", " + cell.column);
                // if(cell.isLinked(cell.west)) console.log("Linked west"); else console.log("NO linked west");
                // if(cell.isLinked(cell.east)) console.log("Linked east"); else console.log("NO linked east" + east_boundary + "!");
                // if(cell.isLinked(cell.south)) console.log("Linked south"); else console.log("NO linked south");
                // if(cell.isLinked(cell.north)) console.log("Linked north"); else console.log("NO linked north");
            });

            output += top + "\n";
            output += bottom + "\n";
         }

         return output;
    }

    contents_of(cell) {
        return "   "; // <-- that's THREE (3) spaces!
    }

    // def toString
    //     output = "+" + "---+" * columns + "\n"
    //     each_row do |row|
    //         top = "|"
    //         bottom = "+"
    //         row.each do |cell|
    //             cell = Cell.new(-1, -1) unless cell
    //             body = " " # <-- that's THREE (3) spaces!
    //             east_boundary = (cell.linked?(cell.east) ? " " : "|")
    //             top << body << east_boundary
    //             // three spaces below, too >>-------------->> >...<
    //             south_boundary = (cell.linked?(cell.south) ? " " : "---")
    //             corner = "+"
    //             bottom << south_boundary << corner
    //         end
    //         output << top << "\n"
    //         output << bottom << "\n"
    //     end
    //     output
    // end

    print() {
        let cells = this.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            value.print();
        }
    }
}

module.exports = Grid;
