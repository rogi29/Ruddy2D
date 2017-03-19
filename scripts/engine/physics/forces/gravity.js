/**
 * Ruddy2D Forces - Gravity
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
    var Gravity = function (){
        if(!(this instanceof Gravity)){
            return new Gravity();
        }
    };

    Gravity.prototype = {
        applyForce: function (body)
        {
            var vector = $2D.physics.Vector(0, 9.81/10);
            body.get('acc').add(vector);
        }
    };

    $2D.physics.Gravity = Gravity;

}());