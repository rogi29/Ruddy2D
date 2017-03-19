/**
 * Ruddy2D Algorithms - Grid
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
     * Grid
     *
     * @param width
     * @param height
     * @param size
     * @returns {Grid}
     * @constructor
     */
    var Grid = function (width, height, size, opts) {

        if(!(this instanceof Grid)) {
            return new Grid(width, height, size, opts);
        }

        opts = opts || {};

        this.columns    = math.floor(width / size);
        this.rows       = math.floor(height / size);
        this.walkable   = (opts.walkable !== undefined) ? opts.walkable : 0;
        this.blocked    = (opts.blocked !== undefined) ? opts.blocked : 1;
        this.size       = size;
        this.grid       = [];
        this.nodes      = [];
        this.clearance  = [];
    };

    Grid.prototype = {
        getColumn: function(n) {
            return math.floor(math.constrain(n/this.size, 0, this.columns-1));
        },

        getRow: function(n) {
            return math.floor(math.constrain(n/this.size, 0, this.rows-1));
        },

        getNode: function(x, y) {
            return (this.nodes[x] && this.nodes[x][y]) ? this.nodes[x][y] : false;
        },

        generate: function()
        {
            var cLen = this.columns, rLen = this.rows,
                grid = [], nodes = [], clearance = [],
                n = this.walkable, c, r;

            for(c = 0; c <= cLen; c++){
                grid[c] = [];
                nodes[c] = [];
                clearance[c] = [];
                for(r = 0; r <= rLen; r++){
                    grid[c][r] = n;
                    nodes[c][r] = $2D.physics.Node(c, r);
                    clearance[c][r] = 1;
                }
            }

            this.grid = grid;
            this.nodes = nodes;
            this.clearance = clearance;
        },

        insert: function(rect)
        {
            var pos     = this.aabb(rect.vector.x, rect.vector.y, rect.size.w, rect.size.h),
                bX      = pos[2], bY = pos[3],
                dX      = rect.size.w/this.size,
                dY      = rect.size.h/this.size,
                size    = math.floor(math.sqrt(dX*dX+dY*dY));

            for(var x = pos[0]; x < bX; x++){
                for(var y = pos[1]; y < bY; y++){
                    if(this.grid[x][y] == this.walkable) {
                        this.grid[x][y] = this.blocked;
                        this.nodes[x][y].blocked = true;
                        this.clearance[x][y] = 0;
                    }
                }
            }

            this.nodes[pos[0]][pos[1]].size = size;
        },

        remove: function(rect)
        {
            var pos = this.aabb(rect.vector.x, rect.vector.y, rect.size.w, rect.size.h),
                bX = pos[2], bY = pos[3];

            for(var x = pos[1]; x < bX; x++){
                for(var y = pos[0]; y < bY; y++){
                    for(var i = 0; i < this.grid[x][y].length; i++){
                        if(this.grid[x][y] == this.blocked) {
                            this.grid[x][y] = this.walkable;
                            this.nodes[x][y].blocked = false;
                            this.nodes[x][y].size = 1;
                            this.clearance[x][y] = 1;
                        }
                    }
                }
            }
        },

        applyClearance: function () {
            var clearance = this.clearance, cLen = this.columns, rLen = this.rows, x, y;

            for(x = 0; x < cLen; x++) {
                for(y = 0; y < rLen; y++) {
                    clearance[x][y] = $2D.physics.Clearance(clearance, x, y, 2);
                }
            }

            return this.clearance = clearance;
        },

        aabb: function (x, y, w, h)
        {
            var aX = math.max(0, this.getColumn(x)),
                aY = math.max(0, this.getRow(y)),
                bX = math.min(this.columns, this.getColumn(x+w)),
                bY = math.min(this.rows, this.getRow(y+h));

            return [aX, aY, bX, bY];
        },

        render: function(color){
            var posX, posY, graphics = new PIXI.Graphics();

            for(var y = 0; y <= this.rows; y++){
                for(var x = 0; x <= this.columns; x++){
                    posX = x*this.size;
                    posY = y*this.size;

                    graphics.beginFill();
                    if(this.clearance[x][y] == 0) {
                        graphics.beginFill(color || 0x333333);
                    }

                    graphics.lineStyle(2, 0x222222);
                    graphics.moveTo(posX, posY);
                    graphics.lineTo(posX, 0);

                    graphics.lineStyle(2, 0x222222);
                    graphics.moveTo(posX, posY);
                    graphics.lineTo(0, posY);


                    graphics.drawRect(posX, posY, this.size, this.size);
                    graphics.endFill();
                }
            }

            return graphics;
        }
    };

    $2D.physics.Grid = Grid;

}());