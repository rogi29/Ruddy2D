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