/**
 * Ruddy2D Geometries - Rectangle
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/rectangle
 */

(function() {

    var Rect = function (x, y, w, h){

        if(!(this instanceof Rect)){
            return new Rect(x, y, w, h);
        }

        this.name   = 'rectangle';
        this.vector = $2D.physics.Vector(x, y);
        this.size   = { w: w, h: h };
    };

    Rect.prototype = {
        getArea: function ()
        {
            return (this.size.w * this.size.h);
        },

        getSurface: function ()
        {
            return (2 * (this.size.w + this.size.h));
        }
    };

    $2D.physics.Rect = Rect;

}());