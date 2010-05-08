importPackage(org.newdawn.slick);
importPackage(net.phys2d.math);
importPackage(net.phys2d.raw);
importPackage(net.phys2d.raw.strategies);

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
    var world = new World(new Vector2f(0, 10), 10, new QuadSpaceStrategy(20, 5));
    var body1 = new StaticBody("Ground1", new Box(400, 20));
    body1.setPosition(250, 400);
    var body2 = new StaticBody("Ground2", new Box(200, 20));
    body1.setPosition(360, 380);
    var body3 = new StaticBody("Ground3", new Box(20, 100));
    body1.setPosition(200, 300);
    var body4 = new StaticBody("Ground4", new Box(20, 100));
    body1.setPosition(400, 300);
}

createWorld();

var simpleGame = {
	init:
	function (gc) {
		//land = new Image("data/land.jpg");
		//plane = new Image("data/plane.png");
	},

	update:
	function (gc, delta) {
		//var input = gc.getInput();
		//if (input.isKeyDown(Input.KEY_A))
			//plane.rotate(-0.2 * delta);
		//if (input.isKeyDown(Input.KEY_D))
			//plane.rotate(0.2 * delta);
		//if (input.isKeyDown(Input.KEY_W)) {
			//var hip = 0.4 * delta;
			//var rotation = plane.getRotation();
			//var m = java.lang.Math;
			//x += hip * m.sin(m.toRadians(rotation));
			//y -= hip * m.cos(m.toRadians(rotation));
		//}
        world.step(TIME_PER_STEP, ITERATIONS_PER_STEP);
	},

	render:
	function (gc, g) {
		//land.draw(0, 0);
        //var pos = body.getPosition();
		//plane.draw(pos.x, pos.y, scale);
	},

	closeRequested:
	function () {
		return true;
	},

	getTitle:
	function () {
		return "Phys2D Demo 1";
	}
};

var app = new AppGameContainer(new Game(simpleGame));
app.setDisplayMode(WIDTH, HEIGHT, false);
app.start();
