/**
 * Ruddy2D Forces - Walkover
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

    var Walkover = function(size, index) {

        if (!(this instanceof Walkover)) {
            return new Walkover(size);
        }

        this.size = size || 1;
        this.index = index || 0;
    };

    Walkover.prototype = {
        follow: function(body, path)
        {
            var len = path.length-1;

            if(this.index >= len) {
                return false;
            }

            var
                dt = 1 / 6,
                curr = path[this.index].getVector(this.size),
                move = body.get('maxSpeed'),
                vector = curr.sub(body.get('pos')),
                distance = vector.getMag();

            if (distance < move) {
                this.index++;

                curr = path[this.index].getVector(this.size);
                move -= distance;
                vector = curr.sub(body.get('pos'));
                distance = vector.getMag();
            }

            body.get('pos').add(vector.setMag(move));
        }
    };

    $2D.physics.Walkover = Walkover;

}());