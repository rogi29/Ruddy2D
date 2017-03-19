var Circle = function (x, y, r, color, player) {
        this.body = $2D.Body($2D.Circle(x, y, r));
        this.pos = this.body.get('pos');
        this.size = {r: r};

        this.pixi = new PIXI.Graphics();
        this.pixi.beginFill(color);
        this.pixi.drawCircle(0, 0, r);
        this.pixi.endFill();
        this.pixi.position.x = x;
        this.pixi.position.y = y;
        this.player = (player) ? true : false;
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
        this.player = (player) ? true : false;
    }

//Setup Game
$2D.setup(function () {
    this.screen = {w: 700, h: 700};
    this.renderer = PIXI.autoDetectRenderer(this.screen.w, this.screen.h, {backgroundColor: 0x000000, antialias: true});
    document.getElementById('screen').appendChild(this.renderer.view);

    this.size   = 20;
    this.rects = [
        new Rect(this.size * 1, this.size * 1, 60, 60, 0xe74c3c, true),
        new Rect(this.size * 10, this.size * 12, 20, 20, 0x5ccdc9),
        new Rect(this.size * 14, this.size * 6, 20, 20, 0x5ccdc9),
        new Rect(this.size * 28, this.size * 16, 140, 140, 0x5ccdc9),
        new Rect(this.size * 0, this.size * 20, 140, 140, 0x5ccdc9),
        new Rect(this.size * 8, this.size * 20, 140, 140, 0x5ccdc9),
        new Rect(this.size * 18, this.size * 20, 120, 120, 0x5ccdc9),
        new Rect(this.size * 22, this.size * 4, 100, 100, 0x5ccdc9)
    ];

    this.step   = 0;
    this.path   = [];
    this.grid   = $2D.Grid(this.screen.w, this.screen.h, this.size, {walkable: null, blocked: Number.MAX_VALUE});
    //this.finder = $2D.Path($2D.AStar({allowDiagonal: true, crossCorners: false}), $2D.Simple(this.size, 0));
    this.finder = $2D.Path($2D.AStar(), $2D.Walkover(this.size, 0));
    this.player = false;

}, {stats: true, type: 0});

//Run Game
$2D.run(function () {
    var stage = new PIXI.Container(), start = [], lines, mouse = $2D.user.mouse;

    grid.generate();

    for(var id in rects) {
        if(rects[id].player) {
            this.player = rects[id];
            start = $2D.Node(Math.floor(rects[id].pos.x/this.size), Math.floor(rects[id].pos.y/this.size));
            var w = (rects[id].size.w) / this.size,
                h = (rects[id].size.h) / this.size,
                size = (w > h) ? w : h;

            start.size = size;
            continue;
        }

        grid.insert($2D.Rect(rects[id].pos.x, rects[id].pos.y, rects[id].size.w, rects[id].size.h));
    }

    if (player) {
        grid.applyClearance();
        $2D.update('pathFinding', (mouse.event === true), $func(function () {
            var m = mouse.down.position,
                x = Math.floor((m.x - player.size.w / 2) / this.size),
                y = Math.floor((m.y - player.size.h / 2) / this.size),
                end = grid.getNode(x, y);

            this.path = this.finder.find(start, end, grid);

            if (path.length > 0)
                finder.setStep(0);
        }).bind(this));

        finder.follow(player.body, path);

        lines = grid.render();
        stage.addChild(lines);
    }

    for(var id in rects){
        rects[id].body.spawn();
        rects[id].pixi.position.x = rects[id].pos.x;
        rects[id].pixi.position.y = rects[id].pos.y;
        rects[id].pixi.rotation = rects[id].body.get('angle');
        stage.addChild(rects[id].pixi);
    }
    renderer.render(stage);
});