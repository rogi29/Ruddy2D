/**
 * Ruddy2D Forces - Drag
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

    var Drag = function (p) {

        if(!(this instanceof Drag)){
            return new Drag();
        }

        this.p = p || 1.22;
    };

    Drag.prototype = {
        applyForce: function(body)
        {
            var force  = body.get('vel').clone(), density = this.p,
                area    = body.area/5000, Cd = body.dragCo,
                speed   = body.get('vel').getMag(),
                formula = (-0.5) * area * density * Cd * speed * speed;

            force.setMag(formula);
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Drag = Drag;

}());