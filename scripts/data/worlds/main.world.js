var stage, renderer, line1, balls, screenW = 700, screenH = 700, body, mouseDown, length, angle, grid, circle, rect;

function Circle(x, y, r, color) {
    this.body = $2D.Body($2D.Circle(x, y, r));
    this.pos = this.body.get('pos');

    this.pixi = new PIXI.Graphics();
    this.pixi.beginFill(color);
    this.pixi.drawCircle(0, 0, r);
    this.pixi.endFill();
    this.pixi.position.x = x;
    this.pixi.position.y = y;
}

function Rect(x, y, w, h, color) {
    this.body = $2D.Body($2D.Rect(x, y, w, h));
    this.pos = this.body.get('pos');

    this.pixi = new PIXI.Graphics();
    this.pixi.beginFill(color);
    this.pixi.drawRect(0, 0, w, h);
    this.pixi.endFill();
    this.pixi.position.x = x;
    this.pixi.position.y = y;
}

//Setup Game
$2D.setup(function () {
    renderer = PIXI.autoDetectRenderer(screenW, screenH, {backgroundColor: 0x000000, antialias: true});
    document.getElementById('screen').appendChild(renderer.view);

    circle = new Circle(200, 200, 35, 0xe74c3c);
    rect = new Rect(screenW / 2, screenH / 2, 60, 60, 0xe74c3c);
    grid = $2D.Spatial(screenW, screenH, 160);

}, {stats: true, type: 0});

//Run Game
$2D.run(function () {
    var collide, lines, x, y;

    stage = new PIXI.Container();
    grid.clear();
    $2D.Attraction(rect.body).applyForce(circle.body, 1);

    circle.body.spawn();

    grid.insert($2D.Rect(circle.pos.x, circle.pos.y, 35, 35), circle.body);
    grid.insert($2D.Rect(rect.pos.x, rect.pos.y, 60, 60), rect.body);

    circle.pixi.position.x = circle.pos.x;
    circle.pixi.position.y = circle.pos.y;

    lines = grid.render();

    stage.addChild(lines);
    stage.addChild(circle.pixi);
    stage.addChild(rect.pixi);

    renderer.render(stage);
});