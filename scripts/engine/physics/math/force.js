(function() {

    var Force = function (vector){

        if(!(this instanceof Force)){
            return new Force(vector);
        }

        if(vector instanceof $2D.physics.Vector){
            this.vector = vector;
        }
    };

    Force.prototype = {
        applyForce: function(body)
        {
            this.vector.divi(body.get('mass'));
            body.get('acc').add(this.vector);
        }
    };

    $2D.physics.Force = Force;

}());