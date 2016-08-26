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