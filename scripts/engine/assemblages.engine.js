(function() {

    /**
     * Assemblages
     *
     * @type {{}}
     */
    var assemblages = {};

    /**
     * Example assemblage
     *
     * @param name
     * @returns {$2D.Entity}
     */
    assemblages.example = function(name)
    {
        var entity = new $2D.Entity();
        entity.addComponent(new $2D.components.example({name: name}));

        return entity;
    };

    /**
     * Assign assemblages to Ruddy2D
     *
     * @type {{}}
     */
    $2D.assemblages = assemblages;

}());
