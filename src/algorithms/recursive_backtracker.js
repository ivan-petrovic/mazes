
"use strict";

class RecursiveBacktracker {

    static on(grid, start_at = grid.random_cell) {
        let stack = [];
        stack.push(start_at);

        while (stack.length > 0) {
            let current = stack[stack.length - 1];
            let neighbors = current.unvisited_neighbors;

            if (neighbors.length == 0) {
                stack.pop();
            } else {
                let index = Math.floor(Math.random() * neighbors.length);
                let neighbor = neighbors[index];
                current.link(neighbor);
                stack.push(neighbor);
            }
        }

        return grid;
    }

}

module.exports = RecursiveBacktracker;

// class RecursiveBacktracker

//     def self.on(grid, start_at: grid.random_cell)
//         stack = []
//         stack.push start_at

//         while stack.any?
//             current = stack.last
//             neighbors = current.neighbors.select { |n| n.links.empty? }

//             if neighbors.empty?
//                 stack.pop
//             else
//                 neighbor = neighbors.sample
//                 current.link(neighbor)
//                 stack.push(neighbor)
//             end
//         end

//         grid
//     end

// end