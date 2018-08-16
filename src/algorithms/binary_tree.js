"use strict";

class BinaryTree {
    
    static on(grid) {
        grid.for_each_cell((cell) => {
            let neighbors = [];
            if(cell.north) neighbors.push(cell.north);
            if(cell.east) neighbors.push(cell.east);
            let index = Math.floor(Math.random() * neighbors.length);
            let neighbor = neighbors[index];
            if (neighbor) cell.link(neighbor);
        });

        return grid;
    }
}

module.exports = BinaryTree;

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
