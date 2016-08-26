(function() {

    var sqrt    = Math.sqrt,
        min     = Math.min,
        max     = Math.max,
        cos     = Math.cos,
        sin     = Math.sin,
        atan2   = Math.atan2;


    var Attraction = function (body){

        if(!(this instanceof Attraction)){
            return new Attraction(body);
        }

        this.body = body;
    };

    Attraction.prototype = {
        applyForce: function (body)
        {
            var force = this.body.get('pos').clone().sub(body.get('pos')), distance, formula;
            force.limitMax(5);
            force.limitMin(25);
            distance = force.getMag();
            force.normalise();
            formula = this.body.get('mass') * body.get('mass') / (distance * distance);
            force.mult(formula);

            $2D.physics.Force(force).applyForce(body.attributes.acc, this.body.get('mass'));
        }
    };

    $2D.physics.Attraction = Attraction;

}());