/**
 * Ruddy2D Forces - Friction
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

    var Friction = function (body) {

        if(!(this instanceof Friction)){
            return new Friction(body);
        }

        this.body = body;
    };

    Friction.prototype = {
        applyForce: function(body)
        {
            var force       = $2D.physics.Vector(0,0),
                velocity    = body.get('vel'),
                clone       = velocity.clone(),
                uN          = body.get('friction');

            force.add(velocity);
            force.normalise();
            force.mult((-1)*uN);

            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Friction = Friction;

}());