"use strict";

class Distances {
    constructor(root) {
        this.root = root;
        this.distances = {};    // distances of cells (relative to root cell)
        this.cells = {};        // cells for which distances are calculated
        
        this.distances[root._hash()] = 0;
        this.cells[root._hash()] = root;
    }

    exists(cell) {
        if(this.distances.hasOwnProperty(cell._hash())) return true;
        return false;
    }

    distance_of(cell) {
        return this.distances[cell._hash()];
    }

    store(cell, distance) {
        this.distances[cell._hash()] = distance;
        this.cells[cell._hash()] = cell;
    }

    // array of cells for which distances are calculated
    get_cells() {
        return Object.values(this.cells);
    }

    path_to(goal) {
        let current = goal;

        let breadcrumbs = new Distances(this.root);
        breadcrumbs.store(current, this.distance_of(current));

        while(current !== this.root) {
            for(const neighbor of current.linked_cells) {
                if (this.distance_of(neighbor) < this.distance_of(current)) {
                    breadcrumbs.store(neighbor, this.distance_of(neighbor));
                    current = neighbor;
                    break;
                }
            }
        }

        return breadcrumbs;
    }

    max() {
        let max_distance = 0;
        let max_cell = this.root;
        
        for(const key in this.distances) {
            let distance = this.distances[key];
            if (distance > max_distance) {
                max_cell = this.cells[key];
                max_distance = distance;
            }
        }
        return [max_cell, max_distance];
    }
}

module.exports = Distances;

// def max
//     max_distance = 0
//     max_cell = @root
    
//     @cells.each do |cell, distance|
//         if distance > max_distance
//             max_cell = cell
//             max_distance = distance
//         end
//     end
//     [max_cell, max_distance]
// end

// def path_to(goal)
//     current = goal

//     breadcrumbs = Distances.new(@root)
//     breadcrumbs[current] = @cells[current]

//     until current == @root
//         current.links.each do |neighbor|
//             if @cells[neighbor] < @cells[current]
//                 breadcrumbs[neighbor] = @cells[neighbor]
//                 current = neighbor
//                 break
//             end
//         end
//     end
    
//     breadcrumbs
// end
