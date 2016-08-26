(function() {

    var sqrt    = Math.sqrt,
        min     = Math.min,
        max     = Math.max,
        cos     = Math.cos,
        sin     = Math.sin,
        atan2   = Math.atan2;


    var Gravity = function (){
        if(!(this instanceof Gravity)){
            return new Gravity();
        }
    };

    Gravity.prototype = {
        applyForce: function (body)
        {
            var vector = $2D.physics.Vector(0, 9.81/10);
            body.get('acc').add(vector);
        }
    };

    $2D.physics.Gravity = Gravity;

}());