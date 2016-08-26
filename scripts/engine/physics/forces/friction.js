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
        this.force = false;
    };

    Friction.prototype = {
        applyForce: function(body)
        {
            var vector = $2D.Vector(0,0), uN = body.get('friction'), velocity = body.get('vel');
            vector.add(velocity);
            vector.normalise();
            vector.mult((-1)*uN);

            this.force = $2D.physics.Force(vector);
            this.force.applyForce(body);
        }
    };

    $2D.physics.Friction = Friction;

}());