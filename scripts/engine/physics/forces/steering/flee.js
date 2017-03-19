/**
 * Ruddy2D Forces - Flee
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

    var Flee = function (target) {

        if(!(this instanceof Flee)){
            return new Flee(target);
        }

        this.target = target;
    };

    Flee.prototype = {
        getForce: function (body)
        {
            var force, desire = body.get('pos').clone().sub(this.target);

            desire.setMag(body.get('maxSpeed'));
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

    $2D.physics.Flee = Flee;

}());