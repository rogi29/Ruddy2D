/**
 * Ruddy2D Algorithms - Binary Heap
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/algorithms
 */

(function () {

    var BinaryHeap = function (scoreFunction) {

        if (!(this instanceof BinaryHeap)) {
            return new BinaryHeap(scoreFunction);
        }

        this.content = $arr ([]);
        this.scoreFunc = scoreFunction;

    };

    BinaryHeap.prototype = {
        /**
         *
         * @returns {Number} length
         */
        size: function() {
            return this.content.length;
        },

        /**
         *
         * @param element
         */
        push: function(element) {
            this.content.push(element);
            this.bubbleUp(this.content.length - 1);
        },

        /**
         *
         * @returns {*} element
         */
        pop: function() {
            var result  = this.content[0],
                end     = this.content.pop(),
                length  = this.content.length;

            if (length > 0) {
                this.content[0] = end;
                this.bubbleDown(0);
            }

            return result;
        },

        update: function(element) {
            var index = this.content.indexOf(element);

            if(index === -1){
                return;
            }

            this.bubbleDown(index);
            return this.bubbleUp(index);
        },

        /**
         *
         * @param node
         */
        remove: function(node) {
            var length  = this.content.length,
                index   = this.content.indexOf(node),
                end     = this.content.pop();

            if(index != (length - 1)){
                this.content[index] = end;
                this.bubbleUp(index);
                this.bubbleDown(index);
            }
        },

        /**
         *
         * @param index
         * @returns {Number} index
         */
        bubbleUp: function(index) {
            var element = this.content[index],
                score   = this.scoreFunc(element);

            while (index > 0) {
                var pIndex  = Math.floor((index + 1) / 2) - 1,
                    parent  = this.content[pIndex];

                if (score >= this.scoreFunc(parent))
                    break;

                this.content[pIndex] = element;
                this.content[index] = parent;
                index = pIndex;
            }

            return index;
        },

        /**
         *
         * @param index
         * @returns {Number} index
         */
        bubbleDown: function(index) {
            var length      = this.content.length,
                element     = this.content[index],
                elScore     = this.scoreFunc(element);

            while(true) {
                var index2  = (index + 1) * 2,
                    index1  = index2 - 1,
                    swap    = null;

                if (index1 < length) {
                    var child1  = this.content[index1],
                        score1  = this.scoreFunc(child1);

                    if (score1 < elScore)
                        swap = index1;
                }

                if (index2 < length) {
                    var child2  = this.content[index2],
                        score2  = this.scoreFunc(child2);

                    if (score2 < (swap == null ? elScore : score1))
                        swap = index2;
                }

                if (swap == null)
                    break;

                this.content[index] = this.content[swap];
                this.content[swap] = element;
                index = swap;
            }

            return index;
        }
    };

    $2D.physics.BinaryHeap = BinaryHeap;

}());