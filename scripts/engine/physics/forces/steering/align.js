/**
 * Ruddy2D Forces - Align
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

    var Align = function (neighbors) {

        if(!(this instanceof Align)){
            return new Align(neighbors);
        }

        this.neighbors = neighbors;
    };

    Align.prototype = {
        getForce: function (body)
        {
            var desire  = $2D.physics.Vector(0, 0),
                list    = this.neighbors,
                len     = list.length,
                count   = 0, i = 0,
                distance, radius;

            for (i; i < len; i++) {
                var neighbor = list[i].body;

                if (body !== neighbor) {
                    distance = body.get('pos').getDist(neighbor.get('pos'));
                    radius = neighbor.get('maxSpace') + body.get('maxSpace');
                    if (distance < radius && distance > 0) {
                        desire.add(neighbor.get('vel'));
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

    $2D.physics.Align = Align;

}());