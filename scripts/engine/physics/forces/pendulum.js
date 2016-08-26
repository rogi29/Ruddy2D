(function() {

    var cos     = Math.cos,
        sin     = Math.sin,
        atan2   = Math.atan2;


    var Pendulum = function (){
        if(!(this instanceof Pendulum)){
            return new Pendulum();
        }
    };

    Pendulum.prototype = {
        applyForce: function (body, length)
        {
            body.attributes.angleAcc = -1 * (0.981/length) * sin(body.get('angle'));
            body.attributes.angleVel *= 0.99;
        }
    };

    $2D.physics.Pendulum = Pendulum;

}());