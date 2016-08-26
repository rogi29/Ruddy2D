(function() {

    var Collision = {

        clamp: function(val, min, max)
        {
            return Math.max(min, Math.min(max, val));
        },

        circle_circle: function (body, body2)
        {
            var dist = body2.get('pos').getDist(body.get('pos')),
                r = body.get('size').r, r2 = body2.get('size').r;

            return (dist <= (r + r2));
        },

        circle_rectangle: function  (body, body2)
        {

            var x   = body.get('pos').x,    y   = body.get('pos').y,
                x2  = body2.get('pos').x,   y2  = body2.get('pos').y,
                w2  = body2.get('size').w,  h2  = body2.get('size').h,
                distX   = x - $2D.physics.Collision.clamp(x, x2, x2 + w2),
                distY   = y - $2D.physics.Collision.clamp(y, y2, y2 + h2),
                distSquared = (distX * distX) + (distY * distY),
                r = body.get('size').r;

            return (distSquared < (r * r));
        },

        rectangle_rectangle: function  (body, body2)
        {
            var w   = body.get('size').w,   h   = body.get('size').h,
                w2  = body2.get('size').w,  h2  = body2.get('size').h,
                x   = body.get('pos').x,    y   = body.get('pos').y,
                x2  = body2.get('pos').x,   y2  = body2.get('pos').y;

            if (x <= (x2 + w2) && x2 <= (x + w) && y <= (y2 + h2)) {
                return (y2 <= (y + h));
            }

            return false;
        },

        rectangle_circle: function (body, body2)
        {
            var x   = body2.get('pos').x,   y   = body2.get('pos').y,
                x2  = body.get('pos').x,    y2  = body.get('pos').y,
                w2  = body.get('size').w,   h2  = body.get('size').h,
                distX   = x - $2D.physics.Collision.clamp(x, x2, x2 + w2),
                distY   = y - $2D.physics.Collision.clamp(y, y2, y2 + h2),
                distSquared = (distX * distX) + (distY * distY),
                r = body2.get('size').r;

            return (distSquared < (r * r));
        }

    };

    $2D.physics.Collision = Collision;

}());