"use strict";

class Distances {
    constructor(root) {
        this.root = root;
        this.cells = {};
        this.cells[root.hash()] = 0;
    }

    exists(cell) {
        if(this.cells.hasOwnProperty(cell.hash())) return true;
        return false;
    }

    lookup(cell) {
        return this.cells[cell.hash()];
    }

    store(cell, distance) {
        this.cells[cell.hash()] = distance;
    }

    // ovo vraca hash celija, pitanje kako da se to konvertuje u celije
    getCells() {
        return this.cells.keys();
    }

    path_to(goal) {
        let current = goal;

        let breadcrumbs = new Distances(this.root);
        // console.log("this.lookup(current)" + this.lookup(current));
        breadcrumbs.store(current, this.lookup(current));

        while(current != this.root) {
            for(let key in current.links) {
                let neighbor = current.links[key];
                if (this.lookup(neighbor) < this.lookup(current)) {
                    breadcrumbs.store(neighbor, this.lookup(neighbor));
                    current = neighbor;
                    break;
                }
            }
        }

        return breadcrumbs;
    }

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
}

module.exports = Distances;
