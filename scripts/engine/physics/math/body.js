(function() {

    var sqrt    = Math.sqrt,
        min     = Math.min,
        max     = Math.max,
        cos     = Math.cos,
        sin     = Math.sin,
        atan2   = Math.atan2;


    var Body = function (shape){

        if(!(this instanceof Body)){
            return new Body(shape);
        }

        this._shape         = shape;

        this._type          = shape.name;

        this.attributes = {
            size:           shape.size,

            area:           shape.getArea(),

            surface:        shape.getSurface(),

            massUnit:       0.2,

            mass:           0.2 * shape.getSurface(),

            density:        1,

            restitution:    1.0,

            friction:       0.1,

            dragCo:         0.47,

            gravity:        1,

            acc:            $2D.physics.Vector(0,0),

            vel:            $2D.physics.Vector(0,0),

            pos:            shape.vector,

            angleAcc:       0,

            angleVel:       0,

            angle:          0
        };
    };

    Body.prototype = {
        get: function(key)
        {
            return this.attributes[key];
        },

        set: function(key, value)
        {
            if(this.attributes[key] == undefined) {
                return false;
            }

            return this.attributes[key] = value;
        },

        spawn: function ()
        {
            this.attributes.vel.add(this.attributes.acc);
            this.attributes.pos.add(this.attributes.vel);
            this.restAcc();

            this.attributes.angleVel += this.attributes.angleAcc;
            this.attributes.angle += this.attributes.angleVel;
        },

        restAcc: function ()
        {
            return this.attributes.acc.mult(0);
        },

        collision: function (body)
        {
            return $2D.physics.Collision[this._type + '_' + body._type](this, body);
        }
    };

    $2D.physics.Body = Body;
    $2D.Body = Body;
}());