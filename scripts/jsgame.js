var jsgame = function () {
    var pub = {};

    var pack;                   // Java import statements

    pack = JavaImporter(
        org.newdawn.slick
    );

    // construct a minimal game implementation
    pub.makeGame = function (title) {
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
    pub.makeSlickApplication = function (game) {
        return new pack.AppGameContainer(new pack.Game(game));
    }

    // wrap a phys2D body and corresponding shape together
    pub.makeBodyWrapper = function (body, shape) {
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
                if (position.getY() - (box.getHeight() / 2) < 0) {
                    return false;
                }
                if (position.getY() + (box.getHeight() / 2) > height) {
                    return false;
                }
                return true;
            },

            equalsId: function (id) {
                return body.getID() === id;
            }
        };
        return obj;
    }

    return pub;
}();
