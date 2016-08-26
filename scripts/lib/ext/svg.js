/**
 * ruddyJS JavaScript Library SVG Extension v0.0.1
 * jQuery like lightweight version
 *
 *  @package    ruddyJS
 *  @author     Gil Nimer
 *  @copyright  Copyright 2015 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/
 */

(function ($r) {
    /**
     * SVG extension
     *
     * @returns {SVG}
     * @constructor
     */
    var SVG = function () {

        if (window === this) {
            return new SVG();
        }

    };

    SVG.ns    = 'http://www.w3.org/2000/svg';
    SVG.xmlns = 'http://www.w3.org/2000/xmlns/';
    SVG.xlink = 'http://www.w3.org/1999/xlink';
    SVG.svgjs = 'http://svgjs.com/svgjs';
    SVG.defaultNS = SVG.ns;
    SVG.id = 0;

    SVG.prototype = {
        ns: function(ns)
        {
            SVG.defaultNS = SVG[ns];
        },

        svg: function(name)
        {
            var element = document.createElementNS(SVG.defaultNS, name)
            element.setAttribute('id', 'ruddy_' + name + SVG.id++);

            this.e = element;
            this.rect = function(h,w,fill){
                var element = document.createElementNS(NS,"rect");
                element.width.baseVal.value=w;
                element.height.baseVal.value=h;
                element.setAttribute("height",h);
                element.style.fill=fill;
                return element;
            };

            return this;
        }
    };

    /**
     * extend the SVG extension to RuddJS Library
     */
    $r(false).extend(SVG);
}($r));