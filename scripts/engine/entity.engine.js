(function() {

    //Entity
    var Entity = function Entity(){
        // Generate a pseudo random ID
        this.id = (+new Date()).toString(16) +
            (Math.random() * 100000000 | 0).toString(16) +
            Entity.prototype._count;

        // increment counter
        Entity.prototype._count++;

        // The component data will live in this object
        this.components = {};

        return this;
    };

    // keep track of entities created
    Entity.prototype._count = 0;

    Entity.prototype.addComponent = function addComponent ( component ){
        // Add component data to the entity
        this.components[component.name] = component;
        return this;
    };

    Entity.prototype.removeComponent = function removeComponent ( componentName ){
        // Remove component data by removing the reference to it.
        // Allows either a component function or a string of a component name to be
        // passed in
        var name = componentName; // assume a string was passed in

        if(typeof componentName === 'function'){
            // get the name from the prototype of the passed component function
            name = componentName.prototype.name;
        }

        delete this.components[name];
        return this;
    };

    Entity.prototype.print = function print () {
        // Function to print / log information about the entity
        console.log(JSON.stringify(this, null, 4));
        return this;
    };

    $2D.Entity = Entity;

}());