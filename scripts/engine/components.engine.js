(function() {

    /**
     * Components
     *
     * @type {{}}
     */
    var components = {};

    /**
     * Example component
     *
     * @component example
     * @param params
     * @returns {components}
     */
    components.example = function(params)
    {
        this.exName = params.name;

        return this;
    };
    components.example.prototype.name = 'example';

    /**
     * Assign components to Ruddy2D
     *
     * @type {{}}
     */
    $2D.components = components;

}());