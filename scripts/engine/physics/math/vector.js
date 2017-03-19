(function() {
    var sqrt = Math.sqrt;

    /**
     * New vector instance
     *
     * @param x
     * @param y
     * @returns {Vector}
     * @constructor
     */
    var Vector = function (x, y) {

        if(!(this instanceof Vector)){
            return new Vector(x, y);
        }

        this.x = x || 0;
        this.y = y || 0;
    };

    Vector.prototype = {
        /**
         * Set x and y values of the current vector
         *
         * @param x
         * @param y
         * @returns {Vector}
         */
        set: function(x, y)
        {
            this.x = x || 0;
            this.y = y || 0;

            return this;
        },

        /**
         * Add an other vector to the current vector
         *
         * @param vector
         * @returns {Vector}
         */
        add: function(vector)
        {
            this.x += vector.x;
            this.y += vector.y;

            return this;
        },

        /**
         * Subtract the current vector by an other vector
         * 
         * @param vector
         * @returns {Vector}
         */
        sub: function(vector)
        {
            this.x -= vector.x;
            this.y -= vector.y;

            return this;
        },

        /**
         * Multiply the current vector by a scalar
         *
         * @param scalar
         * @returns {Vector}
         */
        mult: function(scalar)
        {
            this.x *= scalar;
            this.y *= scalar;

            return this;
        },

        /**
         * Multiply the current vector by an other vector
         *
         * @param vector
         * @returns {Vector}
         */
        multVect: function(vector)
        {
            this.x *= vector.x;
            this.y *= vector.y;

            return this;
        },

        /**
         * Divide the current vector by a scalar
         *
         * @param scalar
         * @returns {Vector}
         */
        divi: function(scalar)
        {
            this.x *= 1/scalar;
            this.y *= 1/scalar;

            return this;
        },

        /**
         * Square the current vector
         *
         * @param clone
         * @returns {*}
         */
        square: function (clone)
        {
            var x = this.x*this.x,
                y = this.y*this.y;

            if(clone) {
                return $2D.physics.Vector(x, y);
            }

            this.x = x;
            this.y = y;
            return this;
        },

        /**
         * Normalise the current vector, Magnitude of 1
         *
         * @returns {Vector}
         */
        normalise: function()
        {
            this.x *= (1/this.getMag());
            this.y *= (1/this.getMag());

            return this;
        },

        /**
         * Dot product
         *
         * @param vector
         * @returns {number}
         */
        dot: function(vector)
        {
            return (this.x * vector.x) + (this.y * vector.y);
        },

        /**
         * Cross product
         *
         * @param vector
         * @returns {number}
         */
        cross: function(vector)
        {
            return (this.x * vector.x) - (this.y * vector.y);
        },

        /**
         * Scaler Projection
         *
         * @param vector
         * @returns {*|Vector}
         */
        scaler: function(vector)
        {
            var clone = vector.clone();
            return clone.setMag(this.dot(clone));
        },

        /**
         * Get current vector magnitude
         *
         * @returns {number}
         */
        getMag: function()
        {
            return sqrt((this.x * this.x) + (this.y * this.y));
        },

        /**
         * Set current vector magnitude
         *
         * @param magnitude
         * @returns {Vector}
         */
        setMag: function(magnitude)
        {
            this.normalise();
            this.mult(magnitude);

            return this;
        },

        /**
         * Get current vector magnitude squared
         *
         * @returns {number}
         */
        magSquared: function()
        {
            return (this.x * this.x) + (this.y * this.y);
        },

        /**
         * Get the distance between the current vector and an other vector
         *
         * @param vector
         * @returns {number}
         */
        getDist: function(vector)
        {
            var clone = this.clone();
            clone.sub(vector);

            return clone.getMag();
        },

        /**
         *
         * @param limit
         * @returns {Vector}
         */
        limitMax: function(limit)
        {
            if(this.getMag() > limit) {
                this.setMag(limit);
            }

            return this;
        },

        /**
         *
         * @param limit
         * @returns {Vector}
         */
        limitMin: function(limit)
        {
            if(this.getMag() < limit) {
                this.setMag(limit);
            }

            return this;
        },

        /**
         * isNaN fix
         *
         * @returns {Vector}
         */
        fix: function()
        {
            this.x = (isNaN(this.x) ? 0 : this.x);
            this.y = (isNaN(this.y) ? 0 : this.y);

            return this;
        },

        /**
         * Rotate current vector
         *
         * @param angle
         * @param isDegrees
         * @returns {*}
         */
        rotate: function(angle, isDegrees)
        {
            var axis = $2D.physics.Angles.rotate(this, angle);

            this.x = axis.x;
            this.y = axis.y;

            return axis;
        },

        /**
         *
         * @param angle
         * @param origin
         * @returns {*|{x, y}}
         */
        transform: function(angle, origin)
        {
            var axis = $2D.physics.Angles.transform(this, angle, origin)

            this.x = axis.x;
            this.y = axis.y;

            return axis;
        },

        /**
         * Get current vector angle
         *
         * @returns {number}
         */
        getAngle: function() {
            return $2D.physics.Angles.get(this.x, this.y);
        },

        /**
         * Set current vector angle
         *
         * @param angle
         * @param mirror
         * @returns {Vector}
         */
        setAngle: function(angle, mirror) {
            var radius = this.getMag(),
                array = $2D.physics.Angles.toAxis(angle, radius);

            if(mirror) {
                this.x = array[1];
                this.y = array[0];

                return this;
            }

            this.x = array[0];
            this.y = array[1];

            return this;
        },

        /**
         * Heading rotation
         *
         * @returns {number}
         */
        heading: function() {
            return (-Math.atan2(-this.y, this.x));
        },

        /**
         * Clone current vector
         *
         * @returns {Vector}
         */
        clone: function()
        {
            return new Vector(this.x, this.y);
        }
    };

    $2D.physics.Vector = Vector;

}());