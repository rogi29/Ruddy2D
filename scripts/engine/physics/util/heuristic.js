(function() {
  var sqrt    = Math.sqrt,
      SQRT2   = Math.SQRT2,
      min     = Math.min,
      max     = Math.max;

  var Heuristic = {
       manhattan: function(dx, dy) {
           return dx + dy;
       },

       euclidean: function(dx, dy) {
           return sqrt(dx * dx + dy * dy);
       },

       octile: function(dx, dy) {
           var F = SQRT2 - 1;
           return (dx < dy) ? F * dx + dy : F * dy + dx;
       },

       chebyshev: function(dx, dy) {
           return max(dx, dy);
      }
  };

  $2D.physics.Heuristic = Heuristic;
}());
