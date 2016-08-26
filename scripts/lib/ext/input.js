/**
 * ruddyJS JavaScript Library Input Extension v0.0.1
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
    if(String.prototype.isEmpty === undefined){
        String.prototype.isEmpty = function() {
            var s = this.trim();
            return (s == null || s == "" || s.length == 0);
        }
    }

    /**
     * Input extension
     *
     * @returns {Input}
     * @constructor
     */
    var Input = function(){

        if (window === this) {
            return new Input();
        }

    };

    /**
     * Input prototypes
     *
     * @type {{preg_match: Function, inputMatch: Function, emptyInput: Function}}
     */
    Input.prototype = {
        /**
         * preg_match
         *
         * @param regex
         * @param string
         * @returns {boolean}
         */
        preg_match: function preg_match(regex, string)
        {
            regex = (regex) ? regex : this.name;
            var reg = new RegExp(regex);
            return (reg.test(string));
        },

        keyCode: function(key)
        {
            switch(key){
                case "backspace":   key = 8;    break;
                case "tab":         key = 9;    break;
                case "return":      key = 13;   break;
                case "shift":       key = 16;   break;
                case "ctrl":        key = 17;   break;
                case "alt":         key = 18;   break;
                case "pausebreak":  key = 19;   break;
                case "capslock":    key = 20;   break;
                case "escape":      key = 27;   break;
                case " ":           key = 32;   break;
                case "pageup":      key = 33;   break;
                case "pagedown":    key = 34;   break;
                case "end":         key = 35;   break;
                case "home":        key = 36;   break;
                case "left":        key = 37;   break;
                case "up":          key = 38;   break;
                case "right":       key = 39;   break;
                case "down":        key = 40;   break;
                case "+":           key = 43;   break;
                case "printscreen": key = 44;   break;
                case "insert":      key = 45;   break;
                case "delete":      key = 46;   break;
                case "0":           key = 48;   break;
                case "1":           key = 49;   break;
                case "2":           key = 50;   break;
                case "3":           key = 51;   break;
                case "4":           key = 52;   break;
                case "5":           key = 53;   break;
                case "6":           key = 54;   break;
                case "7":           key = 55;   break;
                case "8":           key = 56;   break;
                case "9":           key = 57;   break;
                case ";":           key = 59;   break;
                case "=":           key = 61;   break;
                case "a":           key = 65;   break;
                case "b":           key = 66;   break;
                case "c":           key = 67;   break;
                case "d":           key = 68;   break;
                case "e":           key = 69;   break;
                case "f":           key = 70;   break;
                case "g":           key = 71;   break;
                case "h":           key = 72;   break;
                case "i":           key = 73;   break;
                case "j":           key = 74;   break;
                case "k":           key = 75;   break;
                case "l":           key = 76;   break;
                case "m":           key = 77;   break;
                case "n":           key = 78;   break;
                case "o":           key = 79;   break;
                case "p":           key = 80;   break;
                case "q":           key = 81;   break;
                case "r":           key = 82;   break;
                case "s":           key = 83;   break;
                case "t":           key = 84;   break;
                case "u":           key = 85;   break;
                case "v":           key = 86;   break;
                case "w":           key = 87;   break;
                case "x":           key = 88;   break;
                case "y":           key = 89;   break;
                case "z":           key = 90;   break;
                case "numpad 0":    key = 96;   break;
                case "numpad 1":    key = 97;   break;
                case "numpad 2":    key = 98;   break;
                case "numpad 3":    key = 99;   break;
                case "numpad 4":    key = 100;  break;
                case "numpad 5":    key = 101;  break;
                case "numpad 6":    key = 102;  break;
                case "numpad 7":    key = 103;  break;
                case "numpad 8":    key = 104;  break;
                case "numpad 9":    key = 105;  break;
                case "*":           key = 106;  break;
                case "add":         key = 107;  break;
                case "subtract":    key = 109;  break;
                case "decimal .":   key = 110;  break;
                case "/":           key = 111;  break;
                case "f1":          key = 112;  break;
                case "f2":          key = 113;  break;
                case "f3":          key = 114;  break;
                case "f4":          key = 115;  break;
                case "f5":          key = 116;  break;
                case "f6":          key = 117;  break;
                case "f7":          key = 118;  break;
                case "f8":          key = 119;  break;
                case "f9":          key = 120;  break;
                case "f10":         key = 121;  break;
                case "f11":         key = 122;  break;
                case "f12":         key = 123;  break;
                case "numlock":     key = 144;  break;
                case "scrolllock":  key = 145;  break;
                case ";":           key = 186;  break;
                case "=":           key = 187;  break;
                case ",":           key = 188;  break;
                case "-":           key = 189;  break;
                case ".":           key = 190;  break;
                case "/":           key = 191;  break;
            }

            return key;
        },

        /**
         * check if two inputs are matched
         *
         * @param input
         * @param callback
         */
        inputMatch: function (input, callback)
        {
            var obj = this.e, bool;

            input.on('keyup', function(){
                bool = (obj.value == this.value);
                if (callback !== undefined) { callback.call(bool); }
                return bool;
            });
        },

        /**
         * Check if an input is empty
         *
         * @param callback
         */
        emptyInput: function (callback)
        {
            var obj = this.e, bool;

            $r(obj).on('blur', function(){
                bool = obj.value.isEmpty();
                if (callback !== undefined) { callback.call(bool); }
                return bool;
            });
        }
    };

    /**
     * extend the Input extension to RuddJS Library
     */
    $r(false).extend(Input);
}($r));