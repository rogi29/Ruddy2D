(function() {

    var Force = function (vector){

        if(!(this instanceof Force)){
            return new Force(vector);
        }

        if(vector instanceof $2D.physics.Vector){
            this.vector = vector;
            this.magnitude = vector.getMag();
        }
    };

    Force.prototype = {

        applyForce: function(vector, mass)
        {
            //debug(vector);
            this.vector.divi(mass);
            vector.add(this.vector);
        }
    };

    $2D.physics.Force = Force;

}());