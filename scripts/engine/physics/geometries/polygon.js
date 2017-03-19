/**
 * Ruddy2D Geometries - Polygon
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

    var Polygon = function (x, y, nodes){

        if(!(this instanceof Polygon)){
            return new Polygon(x, y, nodes);
        }

        this.name   = 'polygon';
        this.vector = $2D.physics.Vector(x, y);
    };

    Polygon.prototype = {
        getArea: function ()
        {

        },

        getSurface: function ()
        {

        }
    };

    $2D.physics.Polygon = Polygon;

}());