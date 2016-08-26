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

        var c, r, cLen = this.columns, rLen = this.rows, grid = [];

        for(c = 0; c <= cLen; c++){
            grid[c] = [];
            for(r = 0; r <= rLen; r++){
                grid[c][r] = [];
            }
        }

        this.grid = grid;
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
                    this.grid[x][y].forEach(function(e){
                        if(e !== obj && objects.indexOf(e)==  -1) {
                            objects.push(e);
                        }
                    });
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
            var c, r, cLen = this.columns, rLen = this.rows, grid = [];

            for(c = 0; c <= cLen; c++){
                grid[c] = [];
                for(r = 0; r <= rLen; r++){
                    grid[c][r] = [];
                }
            }

            this.grid = grid;
        },

        render: function(){
            var posX, posY, graphics = new PIXI.Graphics();

            for(var y = 0; y <= this.rows; y++){
                for(var x = 0; x <= this.columns; x++){
                    posX = x*this.size;
                    posY = y*this.size;

                    graphics.beginFill();
                    if(this.grid[x][y].length > 0) {
                        graphics.beginFill(0xADD8E6);
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