//Setup Game
$2D.setup(function () {
    this.screen = {w: 700, h: 700};
    this.renderer = PIXI.autoDetectRenderer(this.screen.w, this.screen.h, {backgroundColor: 0x000000, antialias: true});
    document.getElementById('screen').appendChild(this.renderer.view);

    this.Circle =function (x, y, r, color) {
        this.body = $2D.Body($2D.Circle(x, y, r));
        this.pos = this.body.get('pos');

        this.pixi = new PIXI.Graphics();
        this.pixi.beginFill(color);
        this.pixi.drawCircle(0, 0, r);
        this.pixi.endFill();
        this.pixi.position.x = x;
        this.pixi.position.y = y;
    }

    this.Rect = function (x, y, w, h, color) {
        this.body = $2D.Body($2D.Rect(x, y, w, h));
        this.pos = this.body.get('pos');

        this.pixi = new PIXI.Graphics();
        this.pixi.beginFill(color);
        this.pixi.drawRect(0, 0, w, h);
        this.pixi.endFill();
        this.pixi.position.x = x;
        this.pixi.position.y = y;
    }
    this.rect    = new this.Rect(this.screen.w / 2, this.screen.h / 2, 60, 60, 0xe74c3c);
    this.circle  = new this.Circle(200, 200, 30, 0xe74c3c);
    this.grid    = $2D.Spatial(this.screen.w, this.screen.h, 160);

}, {stats: true, type: 0});

//Run Game
$2D.run(function () {
    var stage = new PIXI.Container(), lines;

    grid.clear();
    $2D.Attraction(rect.body).applyForce(circle.body);
    grid.insert($2D.Rect(rect.pos.x, rect.pos.y, 60, 60), rect.body);
    grid.insert($2D.Rect(circle.pos.x, circle.pos.y, 60, 60), circle.body);

    rect.body.spawn();
    circle.body.spawn();

    rect.pixi.position.x = rect.pos.x;
    rect.pixi.position.y = rect.pos.y;
    circle.pixi.position.x = circle.pos.x;
    circle.pixi.position.y = circle.pos.y;
    lines = grid.render();

    stage.addChild(lines);
    stage.addChild(rect.pixi);
    stage.addChild(circle.pixi);
    renderer.render(stage);
});