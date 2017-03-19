/**
 * Ruddy2D Math - Segment
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/math
 */

(function () {

    var Segment = function (v, v2) {

        if (!(this instanceof Segment)) {
            return new Segment(v, v2);
        }

        this.start = v;
        this.end = v2;
    };

    Segment.prototype = {
        getLen: function()
        {
            return this.end.getDist(this.start);
        },

        sub: function()
        {
            return this.end.sub(this.start);
        },

        getCenter: function()
        {
            return this.sub.divi(2).add(this.start);
        },

        getNormal: function() {
            var start = $2D.physics.Vector(this.start.y, this.start.x + this.end.x),
                end = $2D.physics.Vector(this.start.y + this.end.y - start.x, this.start.x - start.y);

            return $2D.physics.Segment(start, end);
        }

    };

    $2D.physics.Segment = Segment;

}());