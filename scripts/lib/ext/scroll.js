/**
 * ruddyJS JavaScript Library Scroll Extension v0.0.1
 * jQuery like lightweight version
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/
 */

(function($r) {
    (function() {
        if (window.pageXOffset === undefined) {
            window.pageXOffset = (document.documentElement.clientWidth) ? document.documentElement.scrollLeft : document.body.scrollLeft;
        }

        if (window.pageYOffset === undefined) {
            window.pageYOffset = (document.documentElement.clientHeight) ? document.documentElement.scrollTop : document.body.scrollTop;
        }
    }());

    /**
     * Scroll extension
     *
     * @returns {Scroll}
     * @constructor
     */
    var Scroll = function(){

        if (window === this) {
            return new Scroll();
        }

    };

    /**
     * Scroll prototypes
     *
     * @type {{scroll: Function, scrollX: Function, scrollY: Function}}
     */
    Scroll.prototype = {
        /**
         * scroll page X and Y
         *
         * @param x
         * @param y
         * @param settings
         */
        scroll: function(x, y, settings)
        {
            var minX = window.pageXOffset, minY = window.pageYOffset, nx = 0, ny = 0,
                delay = 1, duration = 1, callback = false, condition = undefined,
                delta = $r(false).setDelta(
                    'easeOut',
                    {name: 'linear', progress: 4},
                    false
                );

            if(settings !== undefined) {
                delay       =   (settings.delay !== undefined) ? settings.delay : delay;
                duration    =   (settings.duration !== undefined) ? settings.duration : duration;
                callback    =   (settings.callback !== undefined) ? settings.callback : callback;
                condition   =   (settings.condition !== undefined) ? settings.condition : condition;
                delta       =   (settings.delta !== undefined) ? settings.delta : delta;
            }

            this.setAni(
                {
                    delay: 1,
                    duration:   duration * 1000 || 1000,
                    delta:      delta,

                    step: function(delta){
                        nx = minX + (x-minX)*delta;
                        ny = minY + (y-minY)*delta;
                        window.scrollTo(nx, ny);
                    }
                },
                callback,
                condition
            );
        },

        /**
         * scroll page X only
         *
         * @param to
         * @param settings
         */
        scrollX: function(to, settings)
        {
            var minX = window.pageXOffset, nx = 0, delay = 0, duration = 1, callback = false, condition = undefined,
                delta = $r(false).setDelta(
                    'easeOut',
                    {name: 'linear', progress: 4},
                    false
                );

            if(settings !== undefined) {
                delay       =   (settings.delay !== undefined) ? settings.delay : delay;
                duration    =   (settings.duration !== undefined) ? settings.duration : duration;
                callback    =   (settings.callback !== undefined) ? settings.callback : callback;
                condition   =   (settings.condition !== undefined) ? settings.condition : condition;
                delta       =   (settings.delta !== undefined) ? settings.delta : delta;
            }

            this.setAni(
                {
                    delay:      delay,
                    duration:   duration * 1000 || 1000,
                    delta:      delta,

                    step: function(delta){
                        nx = minX + (to-minX)*delta;
                        window.scrollTo(nx, window.pageYOffset);
                    }
                },
                callback,
                condition
            );
        },

        /**
         * scroll page Y only
         *
         * @param to
         * @param settings
         */
        scrollY: function(to, settings)
        {
            var minY = window.pageYOffset, ny = 0, delay = 0, duration = 1, callback = false, condition = undefined,
                delta = $r(false).setDelta(
                    'easeOut',
                    {name: 'linear', progress: 1},
                    false
                );

            if(settings !== undefined) {
                debug(settings.delay);
                delay       =   (settings.delay !== undefined) ? settings.delay : delay;
                duration    =   (settings.duration !== undefined) ? settings.duration : duration;
                callback    =   (settings.callback !== undefined) ? settings.callback : callback;
                condition   =   (settings.condition !== undefined) ? settings.condition : condition;
                delta       =   (settings.delta !== undefined) ? settings.delta : delta;
            }

            this.setAni(
                {
                    delay:      delay,
                    duration:   duration * 1000 || 1000,
                    delta:      delta,

                    step: function(delta){
                        ny = minY + (to-minY)*delta;
                        window.scrollTo(window.pageXOffset, ny);
                    }
                },
                callback,
                condition
            );
        }
    };

    /**
     * extend the Scroll extension to RuddJS Library
     */
    $r(false).extend(Scroll);
}($r));