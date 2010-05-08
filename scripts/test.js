importPackage(org.newdawn.slick);

const WIDTH = 800;
const HEIGHT = 600;

var land, plane;
var x = 400;
var y = 300;
var scale = 1.0;

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
	},

	render:
	function (gc, g) {
		land.draw(0, 0);
		plane.draw(x, y, scale);
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
