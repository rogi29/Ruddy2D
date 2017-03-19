/**
 * Ruddy2D Algorithms - A Star
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

    var AStar = function (opts) {
        if (!(this instanceof AStar)) {
            return new AStar(opts);
        }

        opts = opts || {};

        this.diagonalTypes = {
            always: 1,
            never: 2,
            oneObstacle: 3,
            noObstacles: 4
        };

        this.diagonal           = opts.allowDiagonal || false;
        this.crossCorners       = opts.crossCorners || false;
        this.heuristic          = opts.heuristic || (this.allowDiagonal) ? $2D.Heuristic.octile : $2D.Heuristic.manhattan;
        this.weight             = opts.weight || 1;

        if (!this.diagonal) {
            this.diagonal = this.diagonalTypes.never;
        } else {
            if (this.crossCorners) {
                this.diagonal = this.diagonalTypes.oneObstacle;
            } else {
                this.diagonal = this.diagonalTypes.noObstacles;
            }
        }
    };

    AStar.prototype = {
        find: function(start, end, gridObject) {
            if(!start || !end)
                return [];

            var openList = $2D.physics.BinaryHeap(function(node) {
                    return node.f;
                }),
                diagonalTypes = this.diagonalTypes,
                heuristic   = this.heuristic,
                diagonal    = this.diagonal,
                weight      = this.weight,
                grid        = gridObject.grid,
                nodes       = gridObject.nodes,
                clearance   = gridObject.clearance,
                node, neighbors, neighbor, gScore, visited, i, l,
                size = start.size;

            openList.push(start);
            start.visited = true;

            while(openList.size() > 0) {
                node = openList.pop();
                node.closed = true;

                if(node === nodes[end.x][end.y]) {
                    var path = $arr ([]);
                    while (node.parent) {
                        path.push(node);
                        node = node.parent;
                    }
                    return path.reverse();
                }

                neighbors = node.neighbors(gridObject, diagonal, diagonalTypes);
                for(i = 0, l = neighbors.length; i < l; i++) {
                    neighbor = neighbors[i];

                    if(neighbor.closed  || (neighbor.blocked) || neighbor.getClearance(clearance) <= size)
                        continue;


                    gScore = node.g + ((neighbor.x - node.x === 0 || neighbor.y - node.y === 0) ? neighbor.cost : Math.SQRT2);
                    visited = neighbor.visited;

                    if(!visited || gScore < neighbor.g) {
                        neighbor.g = gScore;
                        neighbor.h = neighbor.h || weight * heuristic(Math.abs(neighbor.x - end.x), Math.abs(neighbor.y - end.y));
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = node;

                        if (!visited) {
                            if(neighbor.getClearance(clearance) > size) {
                                openList.push(neighbor);
                                neighbor.visited = true;
                            }
                        } else {
                            openList.update(neighbor);
                        }
                    }
                }
            }

            return [];
        }
    };

    $2D.physics.AStar = AStar;

}());