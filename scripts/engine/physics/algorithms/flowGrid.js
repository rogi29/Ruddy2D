/**
 * Ruddy2D Algorithms - Flow Grid
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/algorithms
 */

(function() {
    var math = $2D.physics.Math;

    /**
     * Flow Grid
     *
     * @param width
     * @param height
     * @param size
     * @returns {FlowGrid}
     * @constructor
     */
    var FlowGrid = function (width, height, size, vFunc) {

        if(!(this instanceof FlowGrid)) {
            return new FlowGrid(width, height, size, vFunc);
        }

        this.columns    = math.floor(width / size);
        this.rows       = math.floor(height / size);
        this.size       = size;
        this.vFunc      = vFunc;
        this.grid       = [];
    };

    FlowGrid.prototype = {
        generate: function() {
            var c, r, offX = 0, offY = 0, cLen = this.columns, rLen = this.rows, grid = [];

            for(c = 0; c <= cLen; c++){
                offY = 0
                grid[c] = [];
                for(r = 0; r <= rLen; r++){
                    grid[c][r] = $func (this.vFunc).call(this, offX, offY).normalise() || $2D.physics.Vector(0,0);
                    offY += 0.1;
                }
                offX += 0.1;
            }

            this.grid = grid;
        },

        getColumn: function(n) {
            return math.floor(math.constrain(n/this.size, 0, this.columns-1));
        },

        getRow: function(n) {
            return math.floor(math.constrain(n/this.size, 0, this.rows-1));
        },

        getVector: function(v) {
            var x = this.getColumn(v.x),
                y = this.getRow(v.y);

            return (this.grid[x] && this.grid[x][y]) ? this.grid[x][y] : $2D.physics.Vector(0,0);
        },

    };

    $2D.physics.FlowGrid = FlowGrid;

}());