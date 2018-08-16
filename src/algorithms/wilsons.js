"use strict";

class Wilsons {

    static on(grid) {
        let unvisited = [];
        let unvisited_hashes = [];
        let cells = grid.each_cell();
        let value, done;
        
        while({value, done} = cells.next(), !done) {
            let cell = value;
            unvisited.push(cell);
            unvisited_hashes.push(cell._hash());
        }

        // console.log(unvisited_hashes);
        let index = Math.floor(Math.random() * unvisited.length);
        // console.log(unvisited_hashes[index]);
        unvisited.splice(index, 1);
        unvisited_hashes.splice(index, 1);
        // console.log(unvisited_hashes);

        while (unvisited.length > 0) {
            // console.log("In while unvisited: " + unvisited_hashes);
            index = Math.floor(Math.random() * unvisited.length);
            let cell = unvisited[index];
            // console.log("index: " + index);
            // cell.print();
            let path = [];
            let path_hashes = [];
            path.push(cell);
            path_hashes.push(cell._hash());
            // console.log("Path: " + path_hashes);

            while (unvisited_hashes.includes(cell._hash())) {
                cell = cell.sample_neighbor;
                // console.log("Sample cell neighbor: " + cell._hash());
                let position = path_hashes.indexOf(cell._hash());
                if (position > -1) {
                    path.splice(position+1);
                    path_hashes.splice(position+1);
                    // path.push(cell);
                    // path_hashes.push(cell._hash());
                    // console.log("Izbaci iz Path: " + path_hashes);
                } else {
                    path.push(cell);
                    path_hashes.push(cell._hash());
                    // console.log("Dodaj u Path: " + path_hashes);
                }
            }

            // console.log("Out of while.");
            for (let index = 0; index < path.length - 1; index += 1) {
            // for (let index = path.length - 2; index > 0; index -= 1) {
                path[index].link(path[index + 1]);
                let delIndex = unvisited_hashes.indexOf(path_hashes[index]);
                unvisited.splice(delIndex, 1);
                unvisited_hashes.splice(delIndex, 1);
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