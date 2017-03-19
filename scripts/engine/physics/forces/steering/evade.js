/**
 * Ruddy2D Forces - Evade
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

    var Evade = function (target, opts) {

        if(!(this instanceof Evade)){
            return new Evade(target, opts);
        }

        opts = opts || {};

        this.target = target;
        this.future = opts.futureConst || 50;
    };

    Evade.prototype = {
        getForce: function(body)
        {
            var predict = this.target.get('vel').clone(),
                target  = this.target.get('pos').clone();

            predict.setMag(this.future);
            target.add(predict);

            return $2D.physics.Flee(target).getForce(body);
        },

        applyForce: function (body)
        {
            var force = this.getForce(body);
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Evade = Evade;

}());