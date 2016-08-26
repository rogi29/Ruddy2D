/**
 * ruddyJS JavaScript Library Scope Extension v0.0.1
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
     * Scope extension
     *
     * @returns {Scope}
     * @constructor
     */
    var Scope = function () {

        if (window === this) {
            return new Scope();
        }
    };

    var newScope = function() {
        this.$$watchers = [];
    };


    newScope.prototype = {
        $watch: function(watchFn, listenerFn)
        {
            var watcher = {
                watchFn: watchFn,
                listenerFn: listenerFn
            };
            this.$$watchers.push(watcher);
        }
    };

    Scope.prototype.scope = new newScope();

    /**
     * extend the Scope extension to RuddJS Library
     */
    $r(false).extend(Scope);
}($r));