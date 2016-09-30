/**
 * ruddy2D JavaScript 2D Game Engine
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/
 */

(function() {
    var args;

    /**
     * Ruddy2D instance
     */
    var engine = {
        Entity:         {},
        settings:       {},
        components:     {},
        assemblages:    {},
        entities:       [],
        systems:        {},
        user:           {},
        stats: false
    };

    /**
     * Setup game
     *
     * @param callback
     * @param properties
     */
    engine.setup = function(callback, properties) {
        if(properties.stats) {
            engine.stats = new Stats();
            engine.stats.showPanel( properties.type );
            document.body.appendChild( engine.stats.dom );
        }
        $doc (document).addEventListener("load", callback.apply(args));
    };

    /**
     * Run game loop
     *
     * @param callback
     */
    engine.run = function(callback) {

        if(engine.stats != false) {
            var run = function () {
                engine.stats.begin();

                callback.apply(args);

                engine.stats.end();
                window.requestAnimationFrame(run);
            }
            $doc (document).addEventListener("load", run());
            return;

        }

        var run = function(){
            callback();
            window.requestAnimationFrame(run);
        };
        $doc (document).addEventListener("load", run());
    };

    window.$2D = engine;
}());