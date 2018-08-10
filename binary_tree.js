"use strict";

class BinaryTree {
    static on(grid) {
        let cells = grid.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            let cell = value;
            let neighbors = [];
            if(cell.north) neighbors.push(cell.north);
            if(cell.east) neighbors.push(cell.east);
            let index = Math.floor(Math.random() * neighbors.length);
            let neighbor = neighbors[index];
            if (neighbor) cell.link(neighbor);

            /////////
            console.log("Cell: " + cell.row + ", " + cell.column);
            if(cell.north) console.log(" Neighbor at north: " + cell.north.row + ", " + cell.north.column); else console.log(" No north neighbor.");
            if(cell.east) console.log(" Neighbor at east: " + cell.east.row + ", " + cell.east.column); else console.log(" No east neighbor.");
            console.log(" Index: " + index);
            if (neighbor) {
                console.log("Linking cell (" + cell.row + ", " + cell.column + ") with (" + neighbor.row + ", " + neighbor.column + "): " + cell.isLinked(neighbor));
            } else {
                console.log(" No link.");
            }
        }
    }

    // def self.on(grid)
    //     grid.each_cell do |cell|
    //         neighbors = []
    //         neighbors << cell.north if cell.north
    //         neighbors << cell.east if cell.east
    //         index = rand(neighbors.length)
    //         neighbor = neighbors[index]
    //         cell.link(neighbor) if neighbor
    //     end
    //     grid
    // end
}

module.exports = BinaryTree;