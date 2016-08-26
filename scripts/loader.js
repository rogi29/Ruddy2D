(function() {

    /**
     * RequireJS configuration
     *
     * @type {{baseUrl: string, paths: {}}}
     */
    requirejs.config({
        baseUrl: 'scripts',
        urlArgs: "bust=1",
        paths: {
            ruddyjs:    'lib/ruddy',
            pixi:       'lib/pixi.min',
            statsjs:    'lib/stats.min',
            json3:      'lib/json3.min',
            ruddy2D:    'engine/ruddy2D'
        }
    });

    /**
     * Files configuration
     *
     * @type {{ruddyJS: string[], engine: string[], physics: string[], systems: string[]}}
     */
    var files = {
        ruddyJS: [
            'input',
            'animation',
            'ajax'
        ],

        engine: [
            'settings.engine',
            'user.engine',
            'physics.engine',
            'entity.engine',
            'components.engine',
            'assemblages.engine'
        ],

        physics: [
            'util/angles',

            'math/vector',
            'math/force',
            'math/body',
            'math/collision',

            'geometries/circle',
            'geometries/rectangle',

            'forces/gravity',
            'forces/attraction',
            'forces/friction',
            'forces/drag',
            'forces/pendulum',

            'algorithms/spatialGrid'
        ],

        systems: [
            'example.system',
            'render.system'
        ]
    };

    /**
     * Require multiple files
     *
     * @param baseUrl
     * @param paths
     * @param callback
     */
    requirejs.multi = function(baseUrl, paths, callback) {
        var id, names = [];

        for(id in paths) {
            names.push(baseUrl + paths[id]);
        }
        require(names, callback);
    };

    /**
     * Require RuddyJS and Ruddy2D
     *
     * @type string[]
     * @function anonymous
     */
    require(['pixi', 'statsjs', 'json3', 'ruddyjs', 'ruddy2D'], function(){
        // Check if RuddyJS and Ruddy2D defined
        if($r != undefined && $2D != undefined) {
            // Require RuddyJS Extensions files
            requirejs.multi('lib/ext/', files.ruddyJS);

            // Require engine files
            requirejs.multi('engine/', files.engine, function () {

                // Check if physics engine defined
                if($2D.physics != undefined) {
                    // Require physics files
                    requirejs.multi($2D.paths.physics, files.physics, function(){
                        // Require physics extend file
                        require([$2D.paths.physics + 'extend'], function(){

                            // Check if systems engine exists
                            if($2D.systems != undefined) {
                                // Require systems files
                                requirejs.multi($2D.paths.systems, files.systems, function(){

                                    // Require main world
                                    require([$2D.paths.worlds + $2D.settings.world + '.world']);

                                });
                            }

                        });

                    });
                }

            });
        }
    });

}());
