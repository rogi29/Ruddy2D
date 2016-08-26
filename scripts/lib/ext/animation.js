/**
 * ruddyJS JavaScript Library Animation Extension v0.0.1
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
    /**
     * RequestAnimationFrame polyfill
     */
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }());

    /**
     * Get current value
     *
     * @param startPoint
     * @param endPoint
     * @param delta
     * @returns {*}
     */
    function currValue(startPoint, endPoint, delta)
    {
        return startPoint + (endPoint-startPoint)*delta;
    }

    /**
     * Animation extension
     *
     * @returns {Animation}
     * @constructor
     */
    var Animation = function(){

        if (window === this) {
            return new Animation();
        }

        this.animation = function(){};
    };

    /**
     * Animation prototypes
     *
     * @type {{setAni: Function, cancelAnimation: Function, animate: Function, setDelay: Function, getDelta: Function, setEase: Function, setDelta: Function}}
     */
    Animation.prototype = {
        /**
         * Start animation
         *
         * @param opts
         * @param callback
         * @param condition
         */
        setAni: function(opts, callback, condition)
        {
            var start = new Date, timePassed, progress, delta, obj = this.e;

            if(opts === false){
                this.animation = function () {
                    if (callback) { callback.apply(obj); }
                    return true;
                };
                return;
            }

            if(condition !== undefined) {
                this.animation = function () {
                    if(!condition){
                        return;
                    }

                    timePassed = new Date - start;
                    progress = timePassed / opts.duration;

                    if (progress > 1) {
                        progress = 1;
                    }

                    delta = opts.delta(progress);
                    opts.step(delta);

                    if (progress == 1) {
                        if (callback) { callback.apply(obj); }
                        return;
                    }

                    window.requestAnimationFrame(this.animation.bind(this));
                };
            } else {
                this.animation = function () {
                    timePassed = new Date - start;
                    progress = timePassed / opts.duration;

                    if (progress > 1) {
                        progress = 1;
                    }

                    delta = opts.delta(progress);
                    opts.step(delta);

                    if (progress == 1) {
                        if (callback) { callback.apply(obj);}
                        return;
                    }

                    window.requestAnimationFrame(this.animation.bind(this));
                };
            }

            this.animation();
        },

        /**
         * Cancel animation
         *
         * @param callback
         */
        cancelAnimation: function(callback)
        {
            this.setAni(false, callback, false);
        },

        /**
         * Animate (set values)
         *
         * @param style (x=translateX(), y=translateY(), xy=translate())
         * @param startPoint
         * @param endPoint
         * @param delay
         * @param duration
         * @param delta
         * @param ext
         * @param callback
         * @param condition
         */
        animate: function(style, startPoint, endPoint, delay, duration, delta, ext, callback, condition)
        {
            var elem = this.e;

            if(elem.length == 1){
                elem = elem[0];
            }

            this.setAni({
                delay: delay,
                duration: duration * 1000 || 1000,
                delta: delta,
                style: style,
                ext: ext,
                startPoint: startPoint,
                endPoint: endPoint,
                step: function(delta){
                    var minimum = startPoint + (endPoint-startPoint)*delta;
                    switch(style){
                        case 'x':
                            $r(elem).css('transform', 'translateX(' + currValue(startPoint, endPoint, delta) + ext + ')');
                            break;
                        case 'y':
                            $r(elem).css('transform', 'translateY(' + currValue(startPoint, endPoint, delta) + ext + ')');
                            break;
                        case 'xy':
                            $r(elem).css('transform', 'translateX(' + currValue(startPoint['x'], endPoint['x'], delta) + ext + ', ' + currValue(startPoint['y'], endPoint['y'], delta) + ext + ')');
                            break;
                        default:
                            $r(elem).css(style, minimum + ext);
                            break;
                    }
                }
            }, callback, condition);

        },

        /**
         * Set delay
         *
         * @param callback
         * @param delay
         */
        setDelay: function(callback, delay)
        {
            var first = new Date().getTime(), current;
            function frameDelay()
            {
                current = new Date().getTime() - delay;
                if(current >= first){
                    callback();
                    window.cancelAnimationFrame(frameDelay);
                    return false;
                }
                window.requestAnimationFrame(frameDelay);
            }
            frameDelay();
        },

        /**
         * Get delta
         *
         * @param name
         * @param x
         * @returns {Function}
         */
        getDelta: function(name, x)
        {
            switch(name)
            {
                case 'linear':
                    return function linear(progress)
                    {
                        return progress;
                    };
                    break;

                case 'quadrantic':
                    return function quad(progress)
                    {
                        return Math.pow(progress, x);
                    };
                    break;

                case 'circ':
                    return function circ(progress)
                    {
                        return 1 - Math.sin(Math.acos(progress));
                    };
                    break;

                case 'backbow':
                    return function backbow(progress)
                    {
                        return Math.pow(progress, 2) * ((x + 1) * progress - x);
                    };
                    break;

                case 'bounce':
                    return function bounce(progress)
                    {
                        for(var a = 0, b = 1, result; 1; a += b, b /= 2){
                            if(progress >= (7 - 4 * a) / 11){
                                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                            }
                        }
                    };
                    break;

                case 'elastic':
                    return function elastic(progress)
                    {
                        return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*x/3*progress);
                    };
                    break;

                case 'custom':
                    return function custom(progress, x)
                    {
                        return Math.pow(progress, Math.LOG10E);
                    };
                    break;

                default:
                    return function linear(progress)
                    {
                        return progress;
                    };
                    break;
            }
        },

        /**
         * Set ease
         *
         * @param type
         * @param delta
         * @param delta_2
         * @returns {*}
         */
        setEase: function(type, delta, delta_2)
        {
            switch(type){
                case 'easeOut':
                    return function(progress) {
                        return 1 - delta(1 - progress);
                    };
                    break;

                case 'easeInOut':
                    return function(progress) {
                        if (progress < .5){
                            return delta(2*progress) / 2
                        } else {
                            return (2 - delta(2*(1-progress))) / 2
                        }
                    };
                    break;

                case 'easeInOut_delta':
                    return function(progress) {
                        if (progress < 0.5){
                            return delta(2*progress) / 2
                        } else {
                            return (2 - delta_2(2*(1-progress))) / 2
                        }
                    };
                    break;

                default:
                    return delta;
                    break;
            }
        },

        /**
         * Set delta
         *
         * @param type
         * @param delta
         * @param delta_2
         * @returns {*}
         */
        setDelta: function(type, delta, delta_2)
        {
            delta = (delta) ? this.getDelta(delta.name, delta.progress) : false;
            delta_2 = (delta_2) ? this.getDelta(delta_2.name, delta_2.progress) : false;
            return this.setEase(type, delta, delta_2);
        }
    };

    /**
     * extend the Animation extension to RuddJS Library
     */
    $r(false).extend(Animation);
}($r));