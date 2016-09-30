(function() {

    var sqrt    = Math.sqrt,
        min     = Math.min,
        max     = Math.max,
        cos     = Math.cos,
        sin     = Math.sin,
        atan2   = Math.atan2;


    var Friction = function (body) {

        if(!(this instanceof Friction)){
            return new Friction(body);
        }

        this.body = body;
    };

    Friction.prototype = {
        applyForce: function(body)
        {
            var vector = $2D.physics.Vector(0,0), uN = body.get('friction'), velocity = body.get('vel'), clone = velocity.clone();
            vector.add(velocity);
            vector.normalise();
            vector.mult((-1)*uN);

            $2D.physics.Force(vector).applyForce(body.attributes.acc, this.body.get('mass'));
        }
    };

    $2D.physics.Friction = Friction;

}());