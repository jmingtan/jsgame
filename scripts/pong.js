var pong = {};

pong.game = function () {
    var pub = {};

    const WIDTH = 800;          // window width
    const HEIGHT = 600;         // window height
    const FULLSCREEN = false;   // window fullscreen mode
    var app;                    // Slick application instance
    var pack;                   // Java import statements

    pack = JavaImporter(
        org.newdawn.slick,
        net.phys2d.raw,
        net.phys2d.raw.shapes,
        net.phys2d.math
    );

    // construct a minimal game implementation
    function makeGame(title) {
        var game = {
            init: function (gc) {},

            update: function (gc, delta) {},

            render: function (gc, g) {},

            closeRequested: function () {
                return true;
            },

            getTitle: function () {
                return title;
            }
        };
        return game;
    }

    // build a Slick-based wrapper around a game implementation
    function makeSlickApplication(game) {
        return new pack.AppGameContainer(new pack.Game(game));
    }

    // implementation of Pong
    function makePongGame() {
        var game = makeGame("Pong");

        var aX, aY, bX, bY;     // Player locations
        var paddleWidth;        // Paddle width
        var paddleHeight;       // Paddle height
        var paddleSpeed;        // Paddle speed
        var ballX, ballY;       // Ball location
        var ballRadius;         // Ball radius
        var world;              // Phys2D world
        var a;                  // A's body wrapper
        var b;                  // B's body wrapper
        var ballBody;           // Ball body
        var ballMass;           // Ball mass

        function setupGameObjects(width, height) {
            paddleSpeed = 1;
            paddleWidth = width / 25;
            paddleHeight = height / 5;

            aX = (paddleWidth / 2);
            bX = width - paddleWidth - (paddleWidth / 2);
            aY = bY = height / 2;

            ballRadius = paddleWidth / 2;
            ballX = width / 2;
            ballY = height / 2;
        }

        function makeBodyWrapper(body, shape) {
            var obj = {
                body: body,

                shape: shape,

                getPosition: function () {
                    return body.getPosition();
                },

                setPosition: function (x, y) {
                    body.setPosition(x, y);
                },

                isWithinBounds: function (width, height) {
                    var position;                       // position of body
                    var box;                            // bounding box of body

                    position = body.getPosition();
                    box = shape.getBounds();
                    if (position.getY() - (box.getHeight() / 2) < 0)
                        return false;
                    if (position.getY() + (box.getHeight() / 2) > height)
                        return false;
                    return true;
                }
            };
            return obj;
        }

        function setupGamePhysics(width, height) {
            var walls;              // Array of walls surrounding the playing area
            var i;                  // Counter variable
            var wallWidth;          // Width of the walls
            var ballVelocityX;      // Starting x-velocity of the ball
            var ballVelocityY;      // Starting y-velocity of the ball
            var aBody;              // A's body
            var bBody;              // B's body

            ballMass = 10;
            wallWidth = 10;
            ballVelocityX = -0.3;
            ballVelocityY = 0;

            world = new pack.World(new pack.Vector2f(0, 0), 10);

            function makeStaticBoxBody(name, width, height, x, y, world) {
                var shape;          // box shape
                var body;           // static body

                shape = new pack.Box(width, height);
                body = new pack.StaticBody(name, shape);
                body.setPosition(x, y);
                body.setRestitution(1);
                world.add(body);
                return makeBodyWrapper(body, shape);
            }

            a = makeStaticBoxBody("A's Body", paddleWidth, paddleHeight, aX, aY, world);
            b = makeStaticBoxBody("B's Body", paddleWidth, paddleHeight, bX, bY, world);

            ballBody = new pack.Body("Ball Body", new pack.Circle(ballRadius), ballMass);
            ballBody.setPosition(ballX, ballY);
            ballBody.addForce(new pack.Vector2f(ballVelocityX, ballVelocityY));
            ballBody.setFriction(0);
            ballBody.setRestitution(1);
            world.add(ballBody);

            makeStaticBoxBody("Top", width, wallWidth, width / 2, -(wallWidth * 2), world);
            makeStaticBoxBody("Left", wallWidth, height, -(wallWidth * 2), height / 2, world);
            makeStaticBoxBody("Right", wallWidth, height, width + (wallWidth / 2), height / 2, world);
            makeStaticBoxBody("Bottom", width, wallWidth, width / 2, height, world);
        }

        game.init = function (gc) {
            var width = gc.getWidth();          // width of game world
            var height = gc.getHeight();        // height of game world
            setupGameObjects(width, height);
            setupGamePhysics(width, height);
        }

        game.render = function (gc, g) {
            g.drawRect(aX, aY - (paddleHeight / 2), paddleWidth, paddleHeight);
            g.drawRect(bX - (paddleWidth / 2), bY - (paddleHeight / 2), paddleWidth, paddleHeight);
            g.drawOval(ballX, ballY, ballRadius, ballRadius);
        }

        game.update = function (gc, delta) {
            var input;               // Input object
            var positionA;           // Previous y-position for player A
            var positionB;           // Previous y-position for player B

            input = gc.getInput();

            positionA = a.getPosition().getY();
            positionB = b.getPosition().getY();

            if (input.isKeyDown(pack.Input.KEY_W)) {
                a.setPosition(aX, aY - 1);
            }
            if (input.isKeyDown(pack.Input.KEY_S)) {
                a.setPosition(aX, aY + 1);
            }
            if (false == a.isWithinBounds(gc.getWidth(), gc.getHeight())) {
                a.setPosition(a.getPosition().getX(), positionA);
            }

            if (input.isKeyDown(pack.Input.KEY_UP)) {
                b.setPosition(bX, bY - 1);
            }
            if (input.isKeyDown(pack.Input.KEY_DOWN)) {
                b.setPosition(bX, bY + 1);
            }
            if (false == b.isWithinBounds(gc.getWidth(), gc.getHeight())) {
                b.setPosition(b.getPosition().getX(), positionB);
            }

            world.step(delta);
            aX = a.getPosition().getX();
            aY = a.getPosition().getY();
            bX = b.getPosition().getX();
            bY = b.getPosition().getY();
            ballX = ballBody.getPosition().getX();
            ballY = ballBody.getPosition().getY();
        }

        return game;
    }

    // run the game
    pub.run = function () {
        app = makeSlickApplication(makePongGame());
        app.setDisplayMode(WIDTH, HEIGHT, FULLSCREEN);
        app.start();
    }

    return pub;
}();

pong.game.run();
