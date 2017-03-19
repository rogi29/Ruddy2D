/**
 * Ruddy2D Forces - Pendulum
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

    var math = $2D.physics.Math;

    var Pendulum = function (){
        if(!(this instanceof Pendulum)){
            return new Pendulum();
        }
    };

    Pendulum.prototype = {
        applyForce: function (body, length)
        {
            body.attributes.angleAcc = -1 * (0.981/length) * math.sin(body.get('angle'));
            body.attributes.angleVel *= 0.99;
        }
    };

    $2D.physics.Pendulum = Pendulum;

}());