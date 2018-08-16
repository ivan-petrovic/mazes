"use strict";

class AldousBroder {

    static on(grid) {
        let cell = grid.random_cell();
        let unvisited = grid.size() - 1;

        while (unvisited > 0) {
            let neighbors = cell.neighbors();
            let index = Math.floor(Math.random() * neighbors.length);
            let neighbor = neighbors[index]; // let neighbor = cell.neighbors.sample;

            if (Object.keys(neighbor.links).length === 0) {  // neighbor.links.empty
                cell.link(neighbor);
                unvisited -= 1;
            }

            cell = neighbor;
        }

        return grid;
    }

}

module.exports = AldousBroder;

// class AldousBroder

// def self.on(grid)
// cell = grid.random_cell
// unvisited = grid.size - 1

// while unvisited > 0
// neighbor = cell.neighbors.sample

// if neighbor.links.empty?
// cell.link(neighbor)
// unvisited -= 1
// end

// cell = neighbor
// end

// grid
// end

// end