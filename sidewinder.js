"use strict";

class Sidewinder {
    static on(grid) {
        let rows = grid.each_row();
        let value, done;
        
        while({value, done} = rows.next(), !done) {
            let row = value;
            let run = [];

            row.forEach(cell => {
                run.push(cell);

                let at_eastern_boundary = (cell.east == null);
                let at_northern_boundary = (cell.north == null);

                let rand0or1 = Math.floor(Math.random() * 2);
                // close ru if we are at the eastern boundary
                // OR if rand0or1 is 0 and we are not at northern boundary
                // (0 is arbritrary chosen; we could choose 1 too)
                let should_close_out =
                    at_eastern_boundary || (!at_northern_boundary && rand0or1 == 0);

                if (should_close_out) {
                    // sample member of run;
                    let member = run[Math.floor(Math.random() * run.length)];
                    if (member.north) member.link(member.north);
                    run = [];   // clear run array;
                } else {
                    cell.link(cell.east);
                }
            });
        }
    }
}

module.exports = Sidewinder;
    // def self.on(grid)
    //     grid.each_row do |row|
    //         run = []
    //         row.each do |cell|
    //             run << cell
    //             at_eastern_boundary = (cell.east == nil)
    //             at_northern_boundary = (cell.north == nil)
    //             should_close_out =
    //                 at_eastern_boundary ||
    //                 (!at_northern_boundary && rand(2) == 0)
    //             if should_close_out
    //                 member = run.sample
    //                 member.link(member.north) if member.north
    //                 run.clear
    //             else
    //                 cell.link(cell.east)
    //             end
    //         end
    //     end
    //     grid
    // end
