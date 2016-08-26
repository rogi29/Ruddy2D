var stage, renderer, line1, balls, screenW = 700, screenH = 700, body, mouseDown, length, angle;

function circle(x, y, r, color) {
    var body = $2D.Body();
    body.gravity = 1;
    body.restitution = 0.1;
    body.area = Math.PI * r * r;
    body.surface = 2 * Math.PI * r;
    body.position.add($2D.Vector(x,y));

    this.body = body;
    this.radius = r;
    this.mass = body.getMass();
    this.area = body.area;
    this.pos = body.position;
    this.vel = body.velocity;
    this.acc = body.acceleration;

    this.pixi = new PIXI.Graphics();
    this.pixi.beginFill(color);
    this.pixi.drawCircle(0, 0, r);
    this.pixi.endFill();
    this.pixi.position.x = x;
    this.pixi.position.y = y;
}

/**
 * Setup
 */
$2D.setup(function () {
    stage = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(screenW, screenH, { backgroundColor: 0x000000, antialias: true });
    document.getElementById('screen').appendChild(renderer.view);

    var ball1 = new circle(screenW/2, screenH/2,100, 0xe74c3c);
    balls = [ball1];

}, {stats: true, type: 0});

/**
 * Run
 */
$2D.run(function () {
    balls[0].body.spawn();
    balls[0].pixi.position.x = balls[0].pos.x;
    balls[0].pixi.position.y = balls[0].pos.y;

    stage.addChild(balls[0].pixi);

    renderer.render(stage);
});