/**
 * Ruddy2D Algorithms - Spatial Grid
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
     * Spatial Grid
     *
     * @param width
     * @param height
     * @param size
     * @returns {Spatial}
     * @constructor
     */
    var Spatial = function (width, height, size) {

        if(!(this instanceof Spatial)) {
            return new Spatial(width, height, size);
        }

        this.columns    = math.floor(width / size);
        this.rows       = math.floor(height / size);
        this.size       = size;

        var c, r, cLen = this.columns, rLen = this.rows, grid = [], nGrid = [];


        for(c = 0; c <= cLen; c++){
            grid[c] = [];
            nGrid[c] = [];
            for(r = 0; r <= rLen; r++){
                grid[c][r] = [];
                nGrid[c][r] = 0;
            }
        }

        this.grid = grid;
        this.nGrid = nGrid;

    };

    Spatial.prototype = {
        generate: function() {
            var c, r, cLen = this.columns, rLen = this.rows, grid = [], nGrid = [];

            for(c = 0; c <= cLen; c++){
                grid[c] = [];
                nGrid[c] = [];
                for(r = 0; r <= rLen; r++){
                    grid[c][r] = [];
                    nGrid[c][r] = 0;
                }
            }

            this.grid = grid;
            this.nGrid = nGrid;
        },

        insert: function(rect, obj)
        {
            var pos = this.aabb(rect.vector.x, rect.vector.y, rect.size.w, rect.size.h),
                bX = pos[2], bY = pos[3];

            for(var y = pos[1]; y <= bY; y++){
                for(var x = pos[0]; x <= bX; x++){
                    if(this.grid[x][y].indexOf(obj) == -1) {
                        this.nGrid[y][x] = 1;
                        this.grid[x][y].push(obj);
                    }
                }
            }
        },

        retrieve: function(rect, obj)
        {
            var pos = this.aabb(rect.vector.x, rect.vector.y, rect.size.w, rect.size.h),
                bX = pos[2], bY = pos[3], objects = [];

            for(var y = pos[1]; y <= bY; y++){
                for(var x = pos[0]; x <= bX; x++){
                    var e = this.grid[x][y], len = this.grid[x][y].length;
                    for(var i = 0; i < len; i++){
                        if(e[i] !== obj && objects.indexOf(e[i]) ==  -1) {
                            objects.push(e[i]);
                        }
                    }
                }
            }

            return objects;
        },

        remove: function(rect, obj)
        {
            var pos = this.aabb(rect.vector.x, rect.vector.y, rect.size.w, rect.size.h),
                bX = pos[2], bY = pos[3];

            for(var y = pos[0]; y <= bY; y++){
                for(var x = pos[1]; x <= bX; x++){
                    for(var i = 0; i < this.grid[x][y].length; i++){
                        if(this.grid[x][y][i] == obj) {
                            this.grid[x][y].splice(i, 1);
                        }
                    }
                }
            }
        },

        aabb: function (x, y, w, h)
        {
            var aX = math.max(0, parseInt(x / this.size)),
                aY = math.max(0, parseInt(y / this.size)),
                bX = math.min(this.columns, parseInt((x + w-1) / this.size)),
                bY = math.min(this.rows, parseInt((y + h-1) / this.size));

            return [aX, aY, bX, bY];
        },

        render: function(color){
            var posX, posY, graphics = new PIXI.Graphics();

            for(var y = 0; y <= this.rows; y++){
                for(var x = 0; x <= this.columns; x++){
                    posX = x*this.size;
                    posY = y*this.size;

                    graphics.beginFill();
                    if(this.grid[x][y].length > 0) {
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

    $2D.physics.Spatial = Spatial;

}());