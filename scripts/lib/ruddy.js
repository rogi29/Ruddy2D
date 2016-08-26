/**
 * ruddyJS JavaScript Library
 * jQuery like lightweight version
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/
 */

function debug(content){ console.log(content); }

/**
 * trim polyfill
 */
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

/**
 * isArray polyfill
 */
if(!Array.isArray){
    Array.isArray = (function() {

        var toString = Object.prototype.toString;

        return function(arg) {
            return toString.call(arg) === '[object Array]';
        };

    }());
}

/**
 * bind polyfill
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

(function() {

    /**
     * debug - console.log
     *
     * @param content
     */
    function debug(content){ console.log(content); }

    /**
     * isString check if a value is typeof string
     *
     * @param value
     * @returns {boolean}
     */
    function isString(value) { return typeof value === 'string'; }

    /**
     * isNumber check if a value is typeof number
     *
     * @param value
     * @returns {boolean}
     */
    function isNumber(value) {return typeof value === 'number';}

    /**
     * lowercase a string
     *
     * @param string
     * @returns {string}
     */
    var lowercase = function(string) { return isString(string) ? string.toLowerCase() : string; };

    /**
     * uppercase a string
     *
     * @param string
     * @returns {string}
     */
    var uppercase = function(string) { return isString(string) ? string.toUpperCase() : string; };

    /**
     * lowercase a string manually
     *
     * @param s
     * @returns {XML|string|*|void}
     */
    var manualLowercase = function(s) {
        return isString(s)
            ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
            : s;
    };

    /**
     * uppercase a string manually
     *
     * @param s
     * @returns {XML|string|*|void}
     */
    var manualUppercase = function(s) {
        return isString(s)
            ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
            : s;
    };

    /**
     * lowercase polyfill
     */
    if ('i' !== 'I'.toLowerCase()) {
        lowercase = manualLowercase;
        uppercase = manualUppercase;
    }

    String.prototype.ucfirst = function()
    {
        return this.charAt(0).toUpperCase() + this.substr(1);
    };

    /**
     * isArray checks if an object is an array type
     *
     * @param obj
     * @returns {boolean}
     */
    var isArray = function(obj) {
        if(obj.constructor) {
            return (obj.constructor === Array) || (obj.constructor === NodeList);
        } else {
            var length = "length" in Object(obj) && obj.length;

            if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
                return true;
            }

            return isString(obj) || isArray(obj) || length === 0 ||
            typeof length === 'number' && length > 0 && (length - 1) in obj;
        }
    };

    /**
     * isElement checks if an object is a dom element
     *
     * @param o
     * @returns {string|SVGAnimatedString|wa.className|*|I.id|T.id}
     */
    var isElement  = function(o){
        return (o.nodeName || o.tagName || o.className || o.id);
    };

    var last = function(){
        return this[this.length - 1];
    };

    /**
     * QuerySelectorAll polyfill
     */
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }

    /**
     * QuerySelector polyfill
     */
    if (!document.querySelector) {
        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };
    }

    /**
     * QuerySelectorAll
     *
     * @param selectors
     * @returns {HTMLElement}
     */
    var querySelectorAll = function(selectors){
        var elements = document.querySelectorAll(selectors);
        return (elements.length == 1) ? document.querySelector(selectors) : elements;
    };

    /**
     * traverseChildren
     *
     * @param elem
     * @returns {Array}
     */
    function traverseChildren(elem){
        var children = [];
        var q = [];
        q.push(elem);
        while (q.length > 0) {
            var elem = q.pop();
            children.push(elem);
            pushAll(elem.children);
        }
        function pushAll(elemArray){
            for(var i=0; i < elemArray.length; i++) {
                q.push(elemArray[i]);
            }
        }
        return children;
    }

    /**
     * Add Event Listener polyfill
     *
     * @param listener
     * @param func
     * @param obj
     * @param cupture
     * @returns {*}
     */
    function addEvent(listener, func, obj, cupture){
        obj = (obj) ? obj : document;
        if(window.addEventListener){
            return obj.addEventListener(listener, func, cupture);
        } else if(window.attachEvent){
            return obj.attachEvent("on" + listener, func);
        }
    }

    /**
     * Begin
     */
    /**
     * Ruddy Library
     *
     * @param params
     * @returns {$r}
     */
    var $r = function(params) {

        if (window === this) {
            return new $r(params);
        }

        var about = {
            Version: '0.0.1',
            Author: 'Gil Nimer',
            Created: '10/31/2015'
        };

        if(params === undefined) {
            debug('Parameter is undefined');
            return;
        }

        this.e = (isElement(params) || isArray(params)) ? params : querySelectorAll(params);
        this.name = params;
        this.isMouseOver = false;
    };

    $r.prototype = {
        /**
         * Event listener
         *
         * @param listener
         * @param callback
         */
        on: function(listener, callback)
        {
            var obj = this.e, method = callback, target;
            addEvent(listener, function(e){
                e = e || window.event;
                target = e.target || e.srcElement;

                obj.e = e;
                method.apply(obj);
                return this;
            }, obj, false);

            return false;
        },

        /**
         * Click event listener
         *
         * @param callback
         */
        click: function(callback)
        {
            var obj = this.e, method = callback, target;
            addEvent('click', function(e){
                e = e || window.event;
                target = e.target || e.srcElement;

                method.apply(obj);
                return this;
            }, obj, false);

            return false;
        },

        /**
         * MouseOver event listener
         *
         * @param callback
         */
        mouseEnter: function(callback)
        {
            var obj = this.e, method = callback, target, list = traverseChildren(obj), r = this;
            addEvent('mouseover', function(e){
                e = e || window.event;
                target = e.target || e.srcElement;

                if (!!~list.indexOf(target)) {
                    method.apply(obj);
                    r.isMouseOver = true;
                }
                return this;
            }, obj, false);

            return false;
        },

        /**
         * MouseLeave event listener
         *
         * @param callback
         */
        mouseLeave: function(callback)
        {
            var obj = this.e, method = callback, target, list = traverseChildren(obj), r = this;
            addEvent('mouseout', function(e){
                e = e || window.event;
                target = e.toElement || e.relatedTarget;

                if (!!~list.indexOf(target)) {
                    return;
                }
                method.apply(obj);
                r.isMouseOver = false;
                return this;
            }, obj, false);

            return false;
        },

        /**
         * Loop through elements
         *
         * @param callback
         * @param afterCallback
         * @returns {*}
         */
        each: function(callback, afterCallback)
        {
            var i, obj = this.e, len = this.e.length;
            if (isArray(obj)) {
                for (i = 0; i < len; i++) {
                    callback.call(obj[i], i, obj[i]);
                }

                if(afterCallback) {
                    afterCallback.apply(last(obj));
                }
            }

            return obj;
        },

        /**
         * Change/get inner html
         *
         * @param content
         * @param action
         * @returns {string|*|innerHTML}
         */
        html: function(content, action){
            var obj = this.e;

            if(typeof content === "function") {
                obj.innerHTML = content.call(obj);
                return obj.innerHTML;
            }

            if(content !== undefined) {
                switch (action) {
                    case 'add':
                        obj.innerHTML += content;
                        break;

                    case 'replace':
                        obj.innerHTML = content;
                        break;

                    default:
                        obj.innerHTML = content;
                        break;
                }
            }

            return obj.innerHTML;
        },

        /**
         * Change/get css value
         *
         * @param style
         * @param value
         * @returns {*}
         */
        css: function(style, value)
        {
            var obj = this.e;

            if (!(style in document.body.style)) {
                if ('webkit' + style.ucfirst() in document.body.style) {
                    style = 'webkit' + style.ucfirst();
                } else if ('moz' + style.ucfirst() in document.body.style) {
                    style = 'moz' + style.ucfirst();
                } else if ('ms' + style.ucfirst() in document.body.style) {
                    style = 'ms' + style.ucfirst();
                } else if ('o' + style.ucfirst() in document.body.style) {
                    style = 'o' + style.ucfirst();
                } else {
                    debug(style + ' doesn\'t supported by this browser.');
                }
            }

            if(!value) {
                if (isArray(obj)) {
                    return obj[0].style[style];
                } else {
                    return obj.style[style];
                }
            }

            if (isArray(obj)) {
                $r(this.name).each(function () {
                    this.style[style] = value;
                    return this;
                });
            } else {
                obj.style[style] = value;
                return this.e;
            }

        },

        /**
         * Get TranslateX Value
         *
         * @returns {*}
         */
        getTranslateX: function ()
        {

            var values = this.css('transform').match(/translateX\((.*)\)/);

            if(values != null) {
                values = (values[1]).trim();
                return parseInt(values);
            }

            return false;
        },

        /**
         * Get TranslateY Value
         *
         * @returns {*}
         */
        getTranslateY: function ()
        {
            var values = this.css('transform').match(/translateY\((.*)\)/);

            if(values != null) {
                values = (values[1]).trim();
                return parseInt(values);
            }

            return false;
        },

        /**
         * Get Translate Values
         *
         * @returns {*}
         */
        getTranslate: function ()
        {
            var values = this.css('transform').match(/translate\((.*)\)/);

            if(values != null) {
                values = (values[1]).trim();
                values = values.split(",");

                return {x: parseInt(values[0]), y: parseInt(values[1])};
            }

            return {x: 0, y: 0};
        },

        /**
         * Get element offset
         *
         * @returns {{x: number, y: number}}
         */
        position: function (position)
        {
            var box = this.e.getBoundingClientRect(),
                body = document.body,
                docElem = document.documentElement,
                scrollTop, scrollLeft, clientTop, clientLeft, x, y, array;

            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

            clientTop = docElem.clientTop || body.clientTop || 0;
            clientLeft = docElem.clientLeft || body.clientLeft || 0;

            x = box.left + scrollLeft - clientLeft;
            y = box.top + scrollTop - clientTop;
            array = {x: Math.round(x),  y: Math.round(y)};


            return (position) ? array[position] : array;
        },

        /**
         * Get element size
         *
         * @param size
         * @returns {*}
         */
        size: function (size)
        {
            var width = parseInt(this.css('width')) || this.e.offsetWidth || 0,
                height = parseInt(this.css('height')) || this.e.offsetHeight || 0,
                array = {width: width, height: height};

            return size ? array[size] : array;
        },

        /**
         * Hide element
         */
        hide: function()
        {
            if(isArray(this.e)){
                $r(this.name).each(function(){
                    this.style.display = 'none';
                });
            } else {
                this.e.style.display = 'none';
            }
        },

        /**
         * Show element
         */
        show: function()
        {
            if(isArray(this.e)){
                $r(this.name).each(function(){
                    this.style.display = 'inherit';
                });
            } else {
                this.e.style.display = 'inherit';
            }
        },

        /**
         *
         * @returns {boolean}
         */
        isArray: function() {
            var obj = this.e;
            if(obj.constructor) {
                return (obj.constructor === Array) || (obj.constructor === NodeList);
            } else {
                var length = "length" in Object(obj) && obj.length;

                if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
                    return true;
                }

                return isString(obj) || isArray(obj) || length === 0 ||
                typeof length === 'number' && length > 0 && (length - 1) in obj;
            }
        }
    };

    /**
     * This function allow other files to extend RuddyJS Library
     *
     * @param destination
     * @param source
     * @returns {*}
     */
    $r.prototype.extend = function (source, destination) {
        source = source.prototype;
        destination = (destination) ? destination.prototype : $r.prototype;

        for (var attrname in source) {
            if(!destination[attrname])
                destination[attrname] = source[attrname];
        }
        return destination;
    };

    /**
     * This function allow other files to extend RuddyJS Library
     *
     * @param destination
     * @param source
     * @returns {*}
     */
    $r.prototype.extendArrays = function (source, destination) {
        for (var attrname in source) {
            if(!destination[attrname])
                destination[attrname] = source[attrname];
        }
        return destination;
    };

    if(!window.$r) {
        window.$r = $r;
    }
}());