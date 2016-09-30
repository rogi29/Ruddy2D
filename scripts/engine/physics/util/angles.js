(function() {

    var sqrt    = Math.sqrt,
        min     = Math.min,
        max     = Math.max,
        cos     = Math.cos,
        sin     = Math.sin,
        tan     = Math.tan,
        PI      = Math.PI,
        acos    = Math.acos,
        asin    = Math.asin,
        atan    = Math.atan,
        atan2   = Math.atan2;


    var Angles = {
        toDegrees: function(radians)
        {
            return radians*(180/PI);
        },

        toRadians: function(degrees)
        {
            return degrees*(PI/180);
        },

        rotate: function (vector, angle)
        {
            var x = vector.x * cos(angle) - vector.y * sin(angle),
                y = vector.x * sin(angle) + vector.y * cos(angle);

            return {x: x, y: y};
        },

        transform: function(vector, angle, origin)
        {
            var clone = vector.clone();

            if(!origin) {
                origin = vector;
            }

            clone.x -= origin.x;
            clone.y -= origin.y;

            return {
                x: vector.x * cos(angle) - vector.y * sin(angle) + origin.x + clone.x,
                y: vector.x * sin(angle) + vector.y * cos(angle) + origin.y + clone.y
            };
        },

        get: function (x, y)
        {
            return atan2(y, x);
        },

        getTo: function (vector, vector2)
        {
            return atan2((vector2.y - vector.y), (vector2.x - vector.x));
        },

        toAxis: function (angle, radius)
        {
            return [cos(angle)*radius, sin(angle)*radius];
        },

        getBetween: function (vector, vector2)
        {
            var dot = vector.dot(vector2);

            return acos(dot / (vector.getMag() * vector2.getMag()));
        }
    };

    $2D.physics.Angles = Angles;

}());