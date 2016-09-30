(function() {

    var Drag = function (p) {

        if(!(this instanceof Drag)){
            return new Drag();
        }

        this.p = p || 1.22;
        this.force = false;
    };

    Drag.prototype = {
        applyForce: function(body)
        {
            var vector  = body.get('vel').clone(), density = this.p,
                area    = body.area/5000, Cd = body.dragCo,
                speed   = body.get('vel').getMag(),
                formula = (-0.5) * area * density * Cd * speed * speed, force;

            vector.setMag(formula);
            $2D.physics.Force(vector).applyForce(body.get('acc'), body.get('mass'));
        }
    };

    $2D.physics.Drag = Drag;

}());