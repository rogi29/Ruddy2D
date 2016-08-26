/**
 * ruddyJS JavaScript Library Ajax Extension v0.0.1
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
        /**
         * Ajax request polyfill
         */
        if(!window.XMLHttpRequest){

            var AXOs = ['MSXML2.XMLHTTP.6.0', 'MSXML3.XMLHTTP', 'Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0'];
            var correctAXO = null;

            XMLHttpRequest = function() {
                if (correctAXO === null) {
                    var request;
                    if (window.Activerequestect) {
                        for (var i = 0, c = AXOs.length; i < c; i++) {
                            try {
                                request = new window.Activerequestect(AXOs[i]);
                            } catch (e) { request = false; }
                            if (request) {
                                correctAXO = AXOs[i];
                                return request;
                            }
                        }
                    }
                    correctAXO = false;
                }
                if (correctAXO === false) {
                    throw new Error('XMLHttpRequest not supported in this browser');
                }
                return new window.Activerequestect(correctAXO);
            };

        }
    }());

    /**
     * Ajax extension
     *
     * @returns {Ajax}
     * @constructor
     */
    var Ajax = function(){

        if (window === this) {
            return new Ajax();
        }

    };

    /**
     * Ajax prototypes
     *
     * @type {{pushURL: Function}}
     */
    Ajax.prototype = {
        /**
         * pushState url without refresh
         *
         * @param url
         * @param title
         * @param response
         */
        pushURL: function(url, title, response)
        {
            response = (response !== undefined) ? response : {};
            if (typeof (history.pushState) != "undefined") {
                document.title = title;
                history.pushState(response, title, url);
            } else {
                location.hash = '#'+url;
            }
        },

        ajax: function(url, params)
        {
            var request = new XMLHttpRequest(),
                type = 'GET',
                asynchronously = false,
                data = null;

            if(params){
                if(params.method) type = params.method;
                if(params.async) asynchronously = params.async;;
                if(params.data) {
                    data = '?';
                    for(var id in params.data) {
                        data += (id + '=' + params.data[id] + "&");
                    }
                    data.slice(0, -1);
                    url += data;
                }

            }

            request.open(type, encodeURI(url), asynchronously);

            if(params) {
                if(params.mimeType) {
                    request.overrideMimeType(params.mimeType);
                }

                if(params.contentType) {
                    request.setRequestHeader('Content-Type', params.contentType);
                }

                request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status === 200) {
                        if(params.success) {
                            params.success.apply(request);
                        }
                    } else if (request.status !== 200) {
                        if(params.error) {
                            params.error.apply(request);
                        }
                    }
                };

                if(params.send) {
                    request.send(params.send.apply(request));
                } else {
                    request.send();
                }
            } else {
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                request.send();
            }
        }
    };

    /**
     * extend the Ajax extension to RuddJS Library
     */
    $r(false).extend(Ajax);
}($r));