"use strict";

const Distances = require('./distances');

class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.links = {};

        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
    }

    link(cell, bidi = true) {
        // this.links[cell.hash()] = true;
        this.links[cell.hash()] = cell;
        // console.log("Linking cell (" + this.row + ", " + this.column + ") with (" + cell.row + ", " + cell.column + "): " + this.links[cell]);
        if (bidi) {
            cell.link(this, false);
        }
    }

    unlink(cell, bidi = true) {
        delete this.links[cell.hash()];
        if (bidi) {
            cell.unlink(this, false);
        }
    }

    getLinks() {
        return this.links.keys();
    }

    hash() {
        return this.row * 1000 + this.column + 1;
    }

    isLinked(cell) {
        // console.log("Is linked? " + this.links.hasOwnProperty(cell));
        // return this.links.hasOwnProperty(cell);
        // return cell in this.links;
        // if(cell) return this.links[cell.hash()];
        if(cell) return this.links.hasOwnProperty(cell.hash());
        return false;
    }

    neighbors() {
        list = [];
        if(this.north) { list.push(this.north); }
        if(this.south) { list.push(this.south); }
        if(this.east) { list.push(this.east); }
        if(this.west) { list.push(this.west); }
        
        return list;
    }

    print() {
        let east = this.isLinked(this.east) ? "E" : " ";
        let west = this.isLinked(this.west) ? "W" : " ";
        let north = this.isLinked(this.north) ? "N" : " ";
        let south = this.isLinked(this.south) ? "S" : " ";
        console.log('(' + this.row + ', ' + this.column + ') ' +  east + west + north + south);
        console.log(this.links);
    }

    distances() {
        let distances = new Distances(this);
        let frontier = [ this ];
        
        while (frontier.length > 0) {
            let new_frontier = [];
            
            // for (var property in object) {
            //     if (object.hasOwnProperty(property)) {
            //         // do stuff
            //     }
            // }

            frontier.forEach(cell => {
                console.log(Object.keys(cell.links));
                Object.keys(cell.links).forEach((key, index) => {
                    let linked = cell.links[key];
                    // console.log("linked " + linked);
                    if (distances.exists(linked)) return;
                    distances.store(linked, distances.lookup(cell) + 1);
                    new_frontier.push(linked);
                });
            });

            frontier = new_frontier
        }
        return distances;
    }
}
// def distances
// distances = Distances.new(self)
// frontier = [ self ]
// while frontier.any?
// new_frontier = []
// frontier.each do |cell|
// cell.links.each do |linked|
// next if distances[linked]
// distances[linked] = distances[cell] + 1
// new_frontier << linked
// end
// end
// frontier = new_frontier
// end
// end
// distances

module.exports = Cell;