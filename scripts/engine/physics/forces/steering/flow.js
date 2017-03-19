/**
 * Ruddy2D Forces - Flow
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

    var Flow = function (flowGrid) {

        if(!(this instanceof Flow)){
            return new Flow(flowGrid);
        }

        this.field = flowGrid;
    };

    Flow.prototype = {
        getForce: function (body)
        {
            var force, desire = this.field.getVector(body.get('pos')).clone();

            desire.mult(body.get('maxSpeed'));
            force = desire.sub(body.get('vel'));
            force.mult(body.get('maxForce')).divi(body.get('maxSpeed'));

            return force;
        },

        applyForce: function (body)
        {
            var force = this.getForce(body);
            force.limitMax(body.get('maxForce'));
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Flow = Flow;

}());