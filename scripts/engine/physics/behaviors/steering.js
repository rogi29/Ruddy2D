/**
 * Ruddy2D Behaviors - Steering
 *
 *  @package    ruddy2D
 *  @author     Gil Nimer <info@ruddymonkey.com>
 *  @author     Nick Vlug <info@ruddy.nl>
 *  @copyright  Copyright 2016 Ruddy Monkey studios & ruddy.nl
 *  @version    0.0.1
 *
 * http://ruddymonkey.com/ruddy2d/physics/behaviors
 */

(function() {

    var Steering = function (body, weights) {

        if(!(this instanceof Steering)){
            return new Steering(body, weights);
        }

        this.body = body;
        this.force = $2D.physics.Vector(0,0);
        this.weights = weights || {};
    };

    Steering.prototype = {
        apply: function()
        {
            var force = this.force;
            force.limitMax(this.body.get('maxForce'));
            $2D.physics.Force(force).applyForce(this.body);
        },

        arbitration: function(name, force) {
            this.force.mult(this.weights[name] || 1);
            this.force.add(force);
        },

        seek: function(target)
        {
            var force = $2D.physics.Seek(target).getForce(this.body);
            //this.arbitration('seek', force);
            this.arbitration(arguments.callee.name, force);
        },

        flee: function(target)
        {
            var force = $2D.physics.Flee(target).getForce(this.body);
            //this.arbitration('flee', force);
            this.arbitration(arguments.callee.name, force);
        },

        arrival: function(target, opts)
        {
            var force = $2D.physics.Arrival(target, opts).getForce(this.body);
            //this.arbitration('arrival', force);
            this.arbitration(arguments.callee.name, force);
        },

        pursuit: function(target, opts)
        {
            var force = $2D.physics.Pursuit(target, opts).getForce(this.body);
            //this.arbitration('pursuit', force);
            this.arbitration(arguments.callee.name, force);
        },

        evade: function(target, opts)
        {
            var force = $2D.physics.Evade(target, opts).getForce(this.body);
            //this.arbitration('evade', force);
            this.arbitration(arguments.callee.name, force);
        },

        wander: function(opts)
        {
            var force = $2D.physics.Wander(opts).getForce(this.body);
            //this.arbitration('wander', force);
            this.arbitration(arguments.callee.name, force);
        },

        flow: function(flowGrid)
        {
            var force = $2D.physics.Flow(flowGrid).getForce(this.body);
            //this.arbitration('flow', force);
            this.arbitration(arguments.callee.name, force);
        },

        align: function(neighbors)
        {
            var force = $2D.physics.Align(neighbors).getForce(this.body);
            //this.arbitration('align', force);
            this.arbitration(arguments.callee.name, force);
        },

        separation: function(neighbors)
        {
            var force = $2D.physics.Separation(neighbors).getForce(this.body);
            //this.arbitration('separation', force);
            this.arbitration(arguments.callee.name, force);
        },

        cohesion: function(neighbors)
        {
            var force = $2D.physics.Cohesion(neighbors).getForce(this.body);
            //this.arbitration('cohesion', force);
            this.arbitration(arguments.callee.name, force);
        }
    };

    $2D.physics.Steering = Steering;

}());