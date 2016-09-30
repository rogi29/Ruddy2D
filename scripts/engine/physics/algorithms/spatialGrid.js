(function() {
    var min     = Math.min,
        max     = Math.max;

    /**
     * Spatial Grid
     * note: performance check - use ~~+ or ~~ instead of parseInt
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

        this.columns    = parseInt(width / size);
        this.rows       = parseInt(height / size);
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
        aabb: function (x, y, w, h)
        {
            var aX = max(0, parseInt(x / this.size)),
                aY = max(0, parseInt(y / this.size)),
                bX = min(this.columns, parseInt((x + w) / this.size)),
                bY = min(this.rows, parseInt((y + h) / this.size));

            return [aX, aY, bX, bY];
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

        clear: function()
        {
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

        render: function(color){
            var posX, posY, graphics = new PIXI.Graphics();

            for(var y = 0; y <= this.rows; y++){
                for(var x = 0; x <= this.columns; x++){
                    posX = x*this.size;
                    posY = y*this.size;

                    graphics.beginFill();
                    if(this.grid[x][y].length > 0) {
                        graphics.beginFill(color || 0xADD8E6);
                    }

                    graphics.drawRect(posX, posY, this.size, this.size);

                    graphics.endFill();
                }
            }

            return graphics;
        }
    };

    $2D.physics.Spatial = Spatial;

}());