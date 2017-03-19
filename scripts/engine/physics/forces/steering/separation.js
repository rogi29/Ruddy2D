/**
 * Ruddy2D Forces - Separation
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

    var Separation = function (neighbors) {

        if(!(this instanceof Separation)){
            return new Separation(neighbors);
        }

        this.neighbors = neighbors;
    };

    Separation.prototype = {
        getForce: function (body)
        {
            var desire  = $2D.physics.Vector(0, 0),
                list    = this.neighbors,
                count   = 0, distance, radius, diff;

            for (var id in list) {
                var neighbor = list[id].body;
                
                if (body !== neighbor) {
                    distance = body.get('pos').clone().getDist(neighbor.get('pos'));
                    radius = neighbor.get('maxSpace') + body.get('maxSpace');
                    if (distance < radius && distance > 0) {
                        diff = body.get('pos').clone().sub(neighbor.get('pos'));
                        diff.setMag(1/distance);
                        desire.add(diff);
                        count++;
                    }
                }
            }

            if (count > 0) {
                desire.divi(count);
                desire.setMag(body.get('maxSpeed'));
                desire.sub(body.get('vel'));
            }

            return desire;
        },

        applyForce: function (body)
        {
            var force = this.getForce(body);
            force.limitMax(body.get('maxForce'));
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Separation = Separation;

}());