/**
 * Ruddy2D Behaviors - Path Finding
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/behaviors
 */

(function() {

    var Path = function (findAlgorithm, followAlgorithm) {

        if(!(this instanceof Path)){
            return new Path(findAlgorithm, followAlgorithm);
        }

        this.findAlgorithm = findAlgorithm || function(){};
        this.followAlgorithm = followAlgorithm || function(){};
        this.path = [];
    };

    Path.prototype = {
        find: function(start, end, gridObject) {
            return this.findAlgorithm.find(start, end, gridObject);
        },

        follow: function(body, path) {
            path = path || this.path;

            this.followAlgorithm.follow(body, path);
        },

        setStep: function(int)
        {
            this.followAlgorithm.index = int;
        }
    };

    $2D.physics.Path = Path;

}());