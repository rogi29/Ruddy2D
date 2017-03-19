/**
 * Ruddy2D Forces - Pursuit
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

    var Pursuit = function (target, opts) {

        if(!(this instanceof Pursuit)){
            return new Pursuit(target, opts);
        }

        opts = opts || {};

        this.target = target;
        this.future = opts.futureConst || 50;
    };

    Pursuit.prototype = {
        getForce: function(body)
        {
            /*
             var target, d, future, desire,
             tVel = this.target.get('vel').clone(),
             tPos = this.target.get('pos').clone();

             d = tPos.sub(body.get('pos'));
             future = d.getMag() / this.target.get('maxSpeed');
             target = tPos.add(tVel.mult(this.future));*/

            var predict = this.target.get('vel').clone(),
                target  = this.target.get('pos').clone();

            predict.setMag(this.future);
            target.add(predict);

            return $2D.physics.Seek(target).getForce(body);
        },

        applyForce: function (body)
        {
            var force = this.getForce(body);
            $2D.physics.Force(force).applyForce(body);
        }
    };

    $2D.physics.Pursuit = Pursuit;

}());