(function() {

    var math = {
        PI:     Math.PI,

        sqrt:   Math.sqrt,

        SQRT2:  Math.SQRT2,

        min:    Math.min,

        max:    Math.max,

        abs:    Math.abs,

        ceil:   Math.ceil,

        exp:    Math.exp,

        pow:    Math.pow,

        round:  Math.round,

        cos:    Math.cos,

        sin:    Math.sin,

        tan:    Math.tan,

        acos:   Math.acos,

        asin:   Math.asin,

        atan:   Math.atan,

        atan2:  Math.atan2,

        map: function (value, low, high, low2, high2) {
            var percent = (value - low) / (high - low);
            return low2 + percent * (high2 - low2);
        },

        floor: function (float) {
            return (float << 0) || ~~float || Math.floor(float);
        },

        constrain: function(number, min, max) {
            return number > max ? max : number < min ? min : number;
        },

        clamp: function(val, min, max)
        {
            return math.max(min, math.min(max, val));
        }
    };

   // math['aabb'] =

    $2D.physics.Math = math;

}());