var pong = {};

pong.game = function () {
    var pub = {};

    const WIDTH = 800;      // window width
    const HEIGHT = 600;     // window height
    var app;                // Slick application instance
    var slick;              // Shortcut for org.newdawn.slick

    slick = org.newdawn.slick;

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
        return new slick.AppGameContainer(new slick.Game(game));
    }

    // implementation of Pong
    function makePongGame() {
        var game = makeGame("Pong");

        var aX, aY, bX, bY      // Player locations
        var paddleWidth;        // Paddle width
        var paddleHeight;       // Paddle height
        var ballX, ballY;       // Ball location
        var ballRadius;         // Ball radius

        game.init = function (gc) {
            var width = gc.getWidth();
            var height = gc.getHeight();

            paddleWidth = width / 25;
            paddleHeight = height / 5;

            aX = (paddleWidth / 2);
            bX = width - paddleWidth - (paddleWidth / 2);
            aY = bY = height / 2 - (paddleHeight / 2);

            ballRadius = paddleWidth / 2;
            ballX = width / 2;
            ballY = height / 2;
        }

        game.render = function (gc, g) {
            g.drawRect(aX, aY, paddleWidth, paddleHeight);
            g.drawRect(bX, bY, paddleWidth, paddleHeight);
            g.drawOval(ballX, ballY, ballRadius, ballRadius);
        }

        return game;
    }

    // run the game
    pub.run = function () {
        app = makeSlickApplication(makePongGame());
        app.setDisplayMode(WIDTH, HEIGHT, false);
        app.start();
    }

    return pub;
}();

pong.game.run();
