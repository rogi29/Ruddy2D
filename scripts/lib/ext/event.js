/**
 * ruddyJS JavaScript Library Event Extension v0.0.1
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
     * Get Mouse Position
     *
     * @param elem
     * @returns {{y: number, x: number}}
     */
    function mousePosition(e) {
        var x, y;
        x =  e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) || ((e.changedTouches) ? e.changedTouches[0].pageX : 0);
        y =  e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop) || ((e.changedTouches) ? e.changedTouches[0].pageY : 0);

        return {x: Math.round(x), y: Math.round(y)}
    }

    /**
     * Event extension
     *
     * @returns {Event}
     * @constructor
     */
    var Event = function () {

        if (window === this) {
            return new Event();
        }

    };

    /**
     * Event prototype
     *
     * @type {{draggable: Function, droppable: Function}}
     */
    Event.prototype = {
        grabbable: function(axis)
        {
            var obj = false, isDown = false, click = 0, rect, translate, offX, offY, x, y;
            this.css('position', 'absolute');

            function start() {
                var event, mouse;

                rect = $r(this).position();
                mouse = mousePosition(this.e);
                translate = $r(this).getTranslate();

                offX = mouse.x - rect.x;
                offY = mouse.y - rect.y;

                if(!isDown) {
                    event = new CustomEvent("grab.start", {
                        detail: {
                            about: 'Fired when the user grab an element or text selection'
                        },
                        bubbles: true,
                        cancelable: true
                    });

                    this.dispatchEvent(event);
                    obj = this;
                    isDown = true;

                } else {
                    event = new CustomEvent("grab.end", {
                        detail: {
                            about: 'Fired when a grab operation is being ended (for example, by releasing a mouse button)',
                            x: x,
                            y: y,
                            defaultX: rect.x,
                            defaultY: rect.y,
                            translateX: translate.x,
                            translateY: translate.y,
                            normalize: function()
                            {
                                $r(obj).css('transform', 'translate(0px, 0px)');
                            }
                        },

                        bubbles: true,
                        cancelable: true
                    });

                    obj.dispatchEvent(event);
                    isDown = false;
                }
            }

            function move() {
                var event, mouse;

                if(isDown) {
                    mouse = mousePosition(this.e);

                    x = mouse.x + translate.x - rect.x - offX;
                    y = mouse.y + translate.y - rect.y - offY;

                    event = new CustomEvent("grab.move", {
                        detail: {
                            about: 'Fired when an element or text selection is being grabbed and moved',
                            x: x,
                            y: y
                        },
                        bubbles: true,
                        cancelable: true
                    });

                    switch(axis){
                        case 'x':
                            $r(obj).css('transform', 'translate(' + x + 'px, ' + translate.y + 'px)');
                            break;

                        case 'y':
                            $r(obj).css('transform', 'translate(' + translate.x + 'px, ' + y + 'px)');
                            break;

                        default:
                            $r(obj).css('transform', 'translate(' + x + 'px, ' + y + 'px)');
                            break;
                    }

                    obj.dispatchEvent(event);
                }
            }

            $r(this.name).on('click', start);
            $r(document).on('mousemove', move);
        },

        /**
         * Assign draggable area
         *
         * @param axis
         * @param enableTouch
         */
        draggable: function(axis, enableTouch)
        {
            var obj = false, isDown = false, rect, translate, offX, offY, x, y;
            this.css('position', 'absolute');

            function start(e) {
                var event, mouse;

                rect = $r(this).position();
                mouse = mousePosition(this.e);
                translate = $r(this).getTranslate();

                offX = mouse.x - rect.x;
                offY = mouse.y - rect.y;

                event = new CustomEvent("drag.start", {
                    detail: {
                        about: 'Fired when the user starts dragging an element or text selection'
                    },
                    bubbles: true,
                    cancelable: true
                });

                this.dispatchEvent(event);
                obj = this;
                isDown = true;
            }

            function move() {
                var event, mouse;

                if(isDown) {
                    mouse = mousePosition(this.e);

                    x = mouse.x + translate.x - rect.x - offX;
                    y = mouse.y + translate.y - rect.y - offY;

                    this.innerHTML = x;

                    event = new CustomEvent("drag.move", {
                        detail: {
                            about: 'Fired when an element or text selection is being dragged',
                            x: x,
                            y: y
                        },
                        bubbles: true,
                        cancelable: true
                    });

                    switch(axis){
                        case 'x':
                            $r(obj).css('transform', 'translate(' + x + 'px, ' + translate.y + 'px)');
                            break;

                        case 'y':
                            $r(obj).css('transform', 'translate(' + translate.x + 'px, ' + y + 'px)');
                            break;

                        default:
                            $r(obj).css('transform', 'translate(' + x + 'px, ' + y + 'px)');
                            break;
                    }

                    obj.dispatchEvent(event);
                }
            }

            function end(){
                var event;

                if(isDown) {
                    event = new CustomEvent("drag.end", {
                        detail: {
                            about: 'Fired when a drag operation is being ended (for example, by releasing a mouse button)',
                            x: x,
                            y: y,
                            defaultX: rect.x,
                            defaultY: rect.y,
                            translateX: translate.x,
                            translateY: translate.y,
                            normalize: function()
                            {
                                $r(obj).css('transform', 'translate(0px, 0px)');
                            }
                        },

                        bubbles: true,
                        cancelable: true
                    });

                    obj.dispatchEvent(event);
                    isDown = false;
                }
            }

            if(enableTouch) {
                $r(this.name).on('touchstart', start);
                $r(document).on('touchmove', move);
                $r(document).on('touchend', end);
                $r(document).on('touchcancel', end);
            }

            $r(this.name).on('mousedown', start);
            $r(document).on('mousemove', move);
            $r(document).on('mouseup', end);
        },

        /**
         * Assign a droppable area
         *
         * @param area
         * @param sync
         * @returns {boolean}
         */
        droppable: function (area, sync)
        {
            var translate = this.getTranslate(),
                x = area.x + translate.x - this.position('x'),
                y = area.y + translate.y - this.position('y');

            if((area.x - this.size('width')) < this.position('x')
                && (area.x + area.width) >  this.position('x')
                && (area.y - this.size('height')) < this.position('y')
                && (area.y + area.height) >  this.position('y')) {

                var event = new CustomEvent("drop.enter", {
                    detail: {
                        about: 'Fired when an element is dropped on a valid drop area'
                    },

                    bubbles: true,
                    cancelable: true
                });

                this.e.dispatchEvent(event);

                if(sync) {
                    this.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
                }
                return true;
            }

            return false
        }
    };

    /**
     * extend the Event extension to RuddJS Library
     */
    $r(false).extend(Event);
}($r));