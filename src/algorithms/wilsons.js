"use strict";
// Does not work. Not finished.
class Wilsons {

    static on(grid) {
        let unvisited = [];
        let cells = grid.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) { // grid.each_cell { |cell| unvisited << cell }
            let cell = value;
            unvisited.push(cell);
        }

        let index = Math.floor(Math.random() * unvisited.length);
        let first = unvisited[index]; // unvisited.sample
        delete unvisited[index]; // unvisited.delete(first);

        while (unvisited.length > 0) {
            index = Math.floor(Math.random() * unvisited.length);
            let cell = unvisited[index]; // unvisited.sample
            let path = [cell];

            while (unvisited.includes(cell)) {
                cell.print();
                let neighbors = cell.neighbors();
                index = Math.floor(Math.random() * neighbors.length);
                cell = neighbors[index]; // cell = cell.neighbors.sample

                let position = path.indexOf(cell);
                console.log('position ', position);
                if (position > -1) {
                    path = path.slice(0, position); // path = path[0..position]
                } else {
                    path.push(cell); // path << cell
                }
            }

            for (let index = 0; index < path.length - 2; index += 1) {
            // 0.upto(path.length-2) do |index|
                path[index].link(path[index + 1]);
                delete unvisited[index]; // unvisited.delete(path[index]);
            }
        }

        return grid;
    }

}

module.exports = Wilsons;

// class Wilsons
//     def self.on(grid)
//         unvisited = []
//         grid.each_cell { |cell| unvisited << cell }
//         first = unvisited.sample
//         unvisited.delete(first)
//         while unvisited.any?
//             cell = unvisited.sample
//             path = [cell]
//             while unvisited.include?(cell)
//                 cell = cell.neighbors.sample
//                 position = path.index(cell)
//                 if position
//                     path = path[0..position]
//                 else
//                     path << cell
//                 end
//             end
//             0.upto(path.length-2) do |index|
//                 path[index].link(path[index + 1])
//                 unvisited.delete(path[index])
//             end
//         end
//         grid
//     end
// end