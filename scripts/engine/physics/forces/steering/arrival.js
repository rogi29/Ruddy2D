/**
 * Ruddy2D Forces - Arrival
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

    var Arrival = function (target, opts) {

        if(!(this instanceof Arrival)){
            return new Arrival(target, opts);
        }

        opts = opts || {};

        this.target = target;
        this.slowDown = opts.slowDown || 1;
    };

    Arrival.prototype = {
        getForce: function(body)
        {
            var force, map,
                desire = this.target.clone().sub(body.get('pos')),
                distance = desire.getMag();

            if(distance < this.slowDown) {
                map = $2D.physics.Math.map(distance, 0, this.slowDown, 0, body.get('maxSpeed'));

                if (Math.abs(map) < 0.01)
                    map = 0;

                desire.setMag(map);
            } else {
                desire.setMag(body.get('maxSpeed'));
            }

            force = desire.sub(body.get('vel'));
            return force;
        },

        applyForce: function (body)
        {
            var force = this.getForce(body);
            force.limitMax(body.get('maxForce'));
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Arrival = Arrival;

}());