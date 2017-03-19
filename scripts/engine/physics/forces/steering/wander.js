/**
 * Ruddy2D Forces - Wander
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/forces
 */

(function() {

    var Wander = function (opts) {

        if(!(this instanceof Wander)){
            return new Wander(opts);
        }

        opts = opts || {};

        this.distance   = opts.distance || 2;
        this.radius     = opts.radius || 19;
        this.ratio      = this.radius * Math.PI / 180;
        this.angle      = (Math.random() * Math.PI * 2);
    };

    Wander.prototype = {
        getForce: function(body)
        {
            var force, angle,
                desire = body.get('vel').clone().setMag(this.distance);

            this.angle += (this.ratio * 0.5) - (Math.random() * this.ratio);
            force = $2D.physics.Vector(0, -1);//displacement
            force.setAngle(this.angle);
            force.mult(this.radius);
            force.add(desire);

            return force;
        },

        applyForce: function (body)
        {
            var force = this.getForce(body);
            force.limitMax(body.get('maxForce'));
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Wander = Wander;

}());