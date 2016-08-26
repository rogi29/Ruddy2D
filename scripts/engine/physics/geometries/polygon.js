circle.js(function() {
    var PI = Math.PI;

    var Circle = function (vector, r){

        if(!(this instanceof Circle)){
            return new Circle();
        }

        this.name   = 'circle';
        this.body   = $2D.physics.body();
        this.vector = vector;
    };

    Circle.prototype = {
        getArea: function ()
        {
            return (PI * this.r * this.r);
        },

        getSurface: function ()
        {
            return (2 * PI * this.r);
        }
    };

    $2D.physics.Circle = Circle;

}());