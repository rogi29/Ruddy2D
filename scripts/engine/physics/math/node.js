/**
 * Ruddy2D Math - Node
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/math
 */

(function () {

    var Node = function (x, y) {

        if (!(this instanceof Node)) {
            return new Node(x, y);
        }

        this.x = x || 0;
        this.y = y || 0;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.size = 1;
        this.cost = 1;
        this.visited = false;
        this.closed = false;
        this.parent = null;
        this.blocked = false;
    };

    Node.prototype = {
        getClearance: function(grid) {
            return grid[this.x][this.y];
        },

        getVector: function(size)
        {
            return $2D.physics.Vector(this.x*size, this.y*size);
        },

        neighbors: function(gridObject, diagonalMovement, diagonalTypes) {
            var x = this.x,
                y = this.y,
                neighbors = [],
                size = 1,
                s0 = false, d0 = false,
                s1 = false, d1 = false,
                s2 = false, d2 = false,
                s3 = false, d3 = false,
                nodes = gridObject.nodes;

            // ↑
            if (gridObject.getNode(x, y - 1)) {
                neighbors.push(nodes[x][y - 1]);
                s0 = true;
            }
            // →
            if (gridObject.getNode(x + size, y)) {
                neighbors.push(nodes[x+size][y]);
                s1 = true;
            }
            // ↓
            if (gridObject.getNode(x, y + size)) {
                neighbors.push(nodes[x][y + size]);
                s2 = true;
            }
            // ←
            if (gridObject.getNode(x - 1, y)) {
                neighbors.push(nodes[x - 1][y]);
                s3 = true;
            }

            if(!diagonalMovement) {
                return neighbors;
            }

            switch(diagonalMovement) {
                case diagonalTypes['never']:
                    return neighbors;
                    break;

                case diagonalTypes['noObstacles']:
                    d0 = s3 && s0;
                    d1 = s0 && s1;
                    d2 = s1 && s2;
                    d3 = s2 && s3;
                    break;

                case diagonalTypes['oneObstacle']:
                    d0 = s3 || s0;
                    d1 = s0 || s1;
                    d2 = s1 || s2;
                    d3 = s2 || s3;
                    break;

                case diagonalTypes['always']:
                    d0 = true;
                    d1 = true;
                    d2 = true;
                    d3 = true;
                    break;

                default:
                    return [];
                    break;

            }
            // ↖
            if (d0 && gridObject.getNode(x - 1, y - 1)) {
                neighbors.push(nodes[x - 1][y - 1]);
            }
            // ↗
            if (d1 && gridObject.getNode(x + size, y - 1)) {
                neighbors.push(nodes[x + size][y - 1]);
            }
            // ↘
            if (d2 && gridObject.getNode(x + size, y + size)) {
                neighbors.push(nodes[x + size][y + size]);
            }
            // ↙
            if (d3 && gridObject.getNode(x - 1, y + size)) {
                neighbors.push(nodes[x - 1][y + size]);
            }

            return neighbors;
        },
    };

    $2D.physics.Node = Node;

}());