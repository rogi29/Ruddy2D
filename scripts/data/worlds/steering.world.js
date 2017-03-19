var
    math = $2D.physics.Math,
    Circle = function (x, y, r, color, player) {
        this.body = $2D.Body($2D.Circle(x, y, r));
        this.pos = this.body.get('pos');
        this.size = {r: r};

        this.pixi = new PIXI.Graphics();
        this.pixi.beginFill(color);
        this.pixi.drawCircle(0, 0, r);
        this.pixi.endFill();
        this.pixi.position.x = x;
        this.pixi.position.y = y;

        if(player)
            this.player = true;
    },

    Rect = function (x, y, w, h, color, player) {
        this.body = $2D.Body($2D.Rect(x, y, w, h));
        this.pos = this.body.get('pos');
        this.size = {w: w, h: h};

        this.pixi = new PIXI.Graphics();
        this.pixi.beginFill(color);
        this.pixi.drawRect(0, 0, w, h);
        this.pixi.endFill();
        this.pixi.position.x = x;
        this.pixi.position.y = y;
        this.player = false;

        if(player)
            this.player = true;
    }

//Setup
$2D.setup(function() {
    this.screen     = {w: 1800, h: 900};
    this.renderer   = new PIXI.WebGLRenderer(this.screen.w, this.screen.h, {backgroundColor: 0x000000, antialias: true});
    this.size       = 20;
    this.rects      = [];
    this.mouse      = $2D.user.mouse;
    this.seed       = Math.random();
    this.spatial    = $2D.Spatial(this.screen.w, this.screen.h, 100);
    this.field      = $2D.FlowGrid(this.screen.w, this.screen.h, 20, function(x, y) {
                            noise.seed(this.seed);
                            var theta = math.map(noise.simplex2(x,y), 0, 1, 0, (2 * Math.PI));
                            return $2D.Vector(math.cos(theta), math.sin(theta));
                      });

    for(var i = 0; i < 5; i++) {
        var size = Math.floor((Math.random() * 3) + 3);
        this.rects[i] = new Rect(
            this.size * Math.floor((Math.random() * 85) + 1),
            this.size * Math.floor((Math.random() * 37) + 1),
            10 * size,
            10 * size,
            0x5ccdc9
        );
        this.rects[i].body.set('vel', $2D.Vector(0.1,0))
    }

    noise.seed(this.seed);
    this.field.generate();
    $r('#screen').el.appendChild(this.renderer.view);
}, {stats: true, type: 0});

//Run
$2D.run(function() {
    var stage = new PIXI.Container();

    //this.spatial.generate();
    for(var id in rects) {
        var obj     = rects[id],
            size    = obj.size,
            pos     = obj.pos,
            angle   = obj.body.get('angle'),
            bounds  = $2D.Angles.transform(pos, size, angle);

       // this.spatial.insert(new $2D.Rect(bounds.x, bounds.y, bounds.w, bounds.h), obj);
    }

    for(var id in rects) {
        var obj     = rects[id],
            mouse   = this.mouse.position,
            size    = obj.size,
            pos     = obj.pos,
            angle   = obj.body.get('angle'),
            bounds  = $2D.Angles.transform(pos, size, angle),
           // others  = this.spatial.retrieve(new $2D.Rect(bounds.x, bounds.y, bounds.w, bounds.h), obj),
            steer   = $2D.Steering(obj.body, {seek: 1, wander: 0.5, separation: 2, align: 0.5, cohesion:  0.2});


        //steer.wander({radius: math.cos(math.map(noise.simplex2(obj.pos.x, obj.pos.y), 0, 1, 0, (2 * Math.PI)))});
        //steer.flow(this.field);
        //steer.separation(rects);
        steer.seek($2D.Vector(mouse.x, mouse.y));
        //if(others.length > 0) {
            steer.align(rects);
            steer.separation(rects);
            steer.cohesion(rects);
       // }
        steer.apply();
    }


    var lines = this.spatial.render();
    stage.addChild(lines);
    for(var id in rects) {
        var obj = rects[id];
        obj.body.spawn();
        obj.pixi.position.x = obj.pos.x;
        obj.pixi.position.y = obj.pos.y;
        obj.pixi.rotation = obj.body.get('angle');;
        stage.addChild(obj.pixi);

    }
    renderer.render(stage);
});