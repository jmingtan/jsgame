importPackage(org.newdawn.slick);
importPackage(org.jbox2d.collision);
importPackage(org.jbox2d.dynamics);
importPackage(org.jbox2d.common);

const ITERATIONS_PER_STEP = 10;
const TIME_PER_STEP = 1.0 / 60.0;
const WIDTH = 800;
const HEIGHT = 600;

var land, plane;
var x = 400;
var y = 300;
var scale = 1.0;

var world, body;
function createWorld() {
    var worldAABB = AABB(Vec2(0, 0), Vec2(WIDTH, HEIGHT));
    var gravity = Vec2(0, 10);
    world = World(worldAABB, gravity, false);

    var groundBd = BodyDef();
    groundBd.position.set(WIDTH / 2, HEIGHT - 100);
    var ground = world.createBody(groundBd);
    var groundSd = PolygonDef();
    groundSd.setAsBox(WIDTH / 2, 5);
    ground.createShape(groundSd);

    var bd = BodyDef();
    bd.position.set(100, 100);
    bd.angle = 90;
    body = world.createBody(bd);
    var sd = PolygonDef();
    sd.setAsBox(10, 10);
    sd.density = 10;
    body.createShape(sd);
    body.setMassFromShapes();
}

createWorld();

var simpleGame = {
	init:
	function (gc) {
		land = new Image("data/land.jpg");
		plane = new Image("data/plane.png");
	},

	update:
	function (gc, delta) {
		var input = gc.getInput();
		if (input.isKeyDown(Input.KEY_A))
			plane.rotate(-0.2 * delta);
		if (input.isKeyDown(Input.KEY_D))
			plane.rotate(0.2 * delta);
		if (input.isKeyDown(Input.KEY_W)) {
			var hip = 0.4 * delta;
			var rotation = plane.getRotation();
			var m = java.lang.Math;
			x += hip * m.sin(m.toRadians(rotation));
			y -= hip * m.cos(m.toRadians(rotation));
		}
        world.step(TIME_PER_STEP, ITERATIONS_PER_STEP);
	},

	render:
	function (gc, g) {
        land.draw(0, 0);
        var pos = body.getPosition();
        plane.draw(pos.x, pos.y, scale);
	},

	closeRequested:
	function () {
		return true;
	},

	getTitle:
	function () {
		return "Hello World!";
	}
};

var app = new AppGameContainer(new Game(simpleGame));
app.setDisplayMode(WIDTH, HEIGHT, false);
app.start();
