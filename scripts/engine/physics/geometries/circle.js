/**
 * Ruddy2D Geometries - Circle
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/geometries
 */

(function() {
    var PI = Math.PI;

    var Circle = function (x, y, r){

        if(!(this instanceof Circle)){
            return new Circle(x,y,r);
        }

        this.name   = 'circle';
        this.vector = $2D.physics.Vector(x, y);
        this.size   = { r: r };
    };

    Circle.prototype = {
        getArea: function ()
        {
            return (PI * this.size.r * this.size.r);
        },

        getSurface: function ()
        {
            return (2 * PI * this.size.r);
        }
    };

    $2D.physics.Circle = Circle;

}());