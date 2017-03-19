/**
 * Ruddy2D algorithms - Clearance
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/algorithms
 */

(function () {

    var Clearance = function (grid, c, r, capability) {
        var maxClearance = Math.min(grid.length - c, grid[c].length - r);
        var current = grid[c][r];

        if (current > 0) {
            var blocked = false, clearance = 1;

            while (!blocked && clearance < maxClearance) {

                for (var i = 0 ; i <= clearance; i++) {
                    var test = {
                        r: parseInt(r) + i,
                        c: parseInt(c) + clearance
                    };

                    if (grid[test.c][test.r] == 0) {
                        blocked = true;
                        break;
                    }

                }

                for (var i = 0 ; i <= clearance; i++) {
                    var test = {
                        r: parseInt(r) + clearance,
                        c: parseInt(c) + i
                    };

                    if (grid[test.c][test.r] == 0) {
                        blocked = true;
                        break;
                    }
                }

                if (!blocked) {
                    clearance++;
                }
            }

            return clearance;
        }
        return 0;
    };

    $2D.physics.Clearance = Clearance;

}());