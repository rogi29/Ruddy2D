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

    var Dijkstra = function (opts) {
        if (!(this instanceof Dijkstra)) {
            return new Dijkstra(opts);
        }

        opts = opts || {};
        this.unvisited = null;
    };

    Dijkstra.prototype = {
        find: function(start, end, gridObject) {
            if(!start || !end)
                return [];

            var
                grid        = gridObject.grid,
                nodes       = gridObject.nodes,
                clearance   = gridObject.clearance,
                path        = [],
                list        = [],
                next        = null,
                size        = start.size,
                currWeight, nextWeight, nWeight, neighbours, neighbor, curr, i, j;

            end.f = 0;
            grid[end.x][end.y] = 0;
            list.push(end);

            for (i = 0; i < list.length; i++) {
                neighbours = list[i].neighbors(gridObject, false);

                for (j = 0; j < neighbours.length; j++) {
                    neighbor = neighbours[j];

                    if (grid[neighbor.x][neighbor.y] === null) {
                        neighbor.f = list[i].f + 1;
                        grid[neighbor.x][neighbor.y] = neighbor.f;
                        list.push(neighbor);
                    }
                }
            }

            if(list.length == 1 && list[0] == end)
                return path;


            currWeight = grid[start.x][start.y];
            if (currWeight === null || currWeight === Number.MAX_VALUE)
                return;

            path.push(start);
            curr = start;

            while (curr && (curr.x != end.x || curr.y != end.y)) {
                currWeight  = grid[curr.x][curr.y];
                neighbours  = curr.neighbors(gridObject, false);
                next        = null;
                nextWeight  = currWeight;

                for (i = 0; i < neighbours.length; i++) {
                    neighbor = neighbours[i];

                    nWeight = grid[neighbor.x][neighbor.y];
                    if (nWeight < nextWeight) {
                        next = neighbor
                        nextWeight = nWeight;
                    }
                }

                path.push(next);
                curr = next;
            }

            return path;
        }
    };

    $2D.physics.Dijkstra = Dijkstra;

}());