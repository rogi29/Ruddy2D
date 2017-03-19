(function() {

    var
        math    = $2D.physics.Math,
        sqrt    = Math.sqrt,
        min     = Math.min,
        max     = Math.max,
        cos     = Math.cos,
        sin     = Math.sin,
        atan2   = Math.atan2;


    var Body = function (shape, opts){

        if(!(this instanceof Body)){
            return new Body(shape);
        }

        opts = opts || {};

        this._shape         = shape;

        this._type          = shape.name;

        this.size           = shape.size;

        this.area           = shape.getArea();

        this.surface        = shape.getSurface();

        this.massUnit       = opts.massUnit || 1;

        this.strength       = opts.strength || 30;

        this.density        = opts.density || 1.2;

        this.mass           = this.area / this.surface * this.massUnit * this.density;

        this.maxSpeed       = math.floor(this.strength / this.mass * 100) / 100;

        this.maxForce       = math.floor(this.massUnit / this.mass * this.maxSpeed * 1.5 * 100) / 100;

        this.maxSpace       = opts.maxSpace || 10 * this.mass;

        this.friction       = 0.1;

        this.dragCo         = 0.47;

        this.gravity        = 1;

        this.acc            = $2D.physics.Vector(0,0);

        this.vel            = $2D.physics.Vector(0,0);

        this.pos            = shape.vector;

        this.angleAcc       = 0;

        this.angleVel       = 0;

        this.angle          = 0;
    };

    Body.prototype = {
        get: function(key)
        {
            if(!(key in this))
                return undefined;

            return this[key];
        },

        set: function(key, value)
        {
            if(typeof this[key] == 'undefined') {
                return false;
            }

            return this[key] = value;
        },

        spawn: function ()
        {
            this.vel.add(this.acc);
            //this.vel.limitMax(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);

            this.angleVel += this.angleAcc;
            this.angle += this.angleVel;
            this.angleAcc = 0;

            this.angle = (this.vel.heading());// + Math.PI / 2
        },

        restAcc: function ()
        {
            return this.set('acc', $2D.physics.Vector(0,0));
        },

        collision: function (body)
        {
            return $2D.physics.Collision[this._type + '_' + body._type](this, body);
        }
    };

    $2D.physics.Body = Body;

}());