(function() {
    var math    = $2D.physics.Math;

    var Angles = {
        toDegrees: function(radians)
        {
            return radians*(180/math.PI);
        },

        toRadians: function(degrees)
        {
            return degrees*(math.PI/180);
        },

        rotate: function (vector, angle)
        {
            var x = vector.x * math.cos(angle) - vector.y * math.sin(angle),
                y = vector.x * math.sin(angle) + vector.y * math.cos(angle);

            return {x: x, y: y};
        },

        transform: function(pos, size, angle) {
                var rect    = {x: pos.x, y: pos.y, w: size.w, h: size.y},
                    width   = size.w,
                    height  = size.h,
                    c       = math.cos(angle),
                    s       = math.sin(angle),
                    cpos    = true,
                    spos    = true;

                if (s < 0) {
                    s = -s;
                    spos = false;
                }

                if (c < 0) {
                    c = -c;
                    cpos = false;
                }

                rect.w = height * s + width * c;
                rect.h = height * c + width * s;

                if (cpos) {
                    if (spos)
                        rect.x -= height * s;
                    else
                        rect.y -= width * s;
                } else if (spos) {
                    rect.x -= width * c - height * s;
                    rect.y -= height * c;
                } else {
                    rect.x -= width * c;
                    rect.y -= width * s + height * c;
                }

                return rect;

            /*
            var minx = Math.min(Math.min(region.x1(), region.x2()), Math.min(region.x3(), region.x4())); // region is your rotating region object
            var miny = Math.min(Math.min(region.y1(), region.y2()), Math.min(region.y3(), region.y4())); // region is your rotating region object
            var maxx = Math.max(Math.max(region.x1(), region.x2()), Math.max(region.x3(), region.x4())); // region is your rotating region object
            var maxy = Math.max(Math.max(region.y1(), region.y2()), Math.max(region.y3(), region.y4()));
            */
        },

        get: function (x, y)
        {
            return math.atan2(y, x);
        },

        getTo: function (vector, vector2)
        {
            return math.atan2((vector2.y - vector.y), (vector2.x - vector.x));
        },

        toAxis: function (angle, radius)
        {
            return [math.cos(angle)*radius, math.sin(angle)*radius];
        },

        getBetween: function (vector, vector2)
        {
            var dot = vector.dot(vector2);

            return math.cos(dot / (vector.getMag() * vector2.getMag()));
        }
    };

    $2D.physics.Angles = Angles;

}());