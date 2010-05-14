load("scripts/jsgame.js");
load("testscripts/jstest.js");

function testJSGame() {
    var suiteName = "JSGameSuite";

    function testMakeGame() {
        var title = "TestTitle";
        var obj = jsgame.makeGame(title);
        jstest.assert("error, title != " + title, title == obj.getTitle());
        jstest.assert("error, init property not defined", obj.hasOwnProperty("init"));
        jstest.assert("error, update property not defined", obj.hasOwnProperty("update"));
        jstest.assert("error, render property not defined", obj.hasOwnProperty("render"));
        jstest.assert("error, closeRequested property not defined", obj.hasOwnProperty("closeRequested"));
    }

    function testMakeBodyWrapper() {
        var position = {};
        var id = 100;
        var x1, y1;
        var x2 = 200, y2 = 300;
        var body = {
            getPosition: function () {return position;},
            setPosition: function (x, y) {x1 = x; y1 = y},
            getID: function () {return id;}
        };
        var shape = {};
        var obj = jsgame.makeBodyWrapper(body, shape);
        jstest.assert("error, body not assigned properly", body === obj.body);
        jstest.assert("error, shape not assigned properly", shape === obj.shape);
        jstest.assert("error, getPostition returned unexpected value", position === obj.getPosition());
        obj.setPosition(x2, y2);
        jstest.assert("error, position not assigned properly", x2 === x1 && y2 === y1);
        jstest.assert("error, id was unexpected", obj.equalsId(id));
    }

    function testIsWithinBounds() {
        var x = 150;
        var y = 150;
        var boxHeight = 20;
        var position = {
            getY: function () {return y;},
            getX: function () {return x;}
        };
        var body = {
            getPosition: function () {return position;}
        };
        var box = {
            getHeight: function () {return boxHeight;}
        };
        var shape = {
            getBounds: function () {return box;}
        };
        var width = 200, height = 400;
        var obj = jsgame.makeBodyWrapper(body, shape);
        jstest.assert("error, should be within bounds", obj.isWithinBounds(width, height));
    }

    jstest.suite(suiteName);
    jstest.run(testMakeGame);
    jstest.run(testMakeBodyWrapper);
    jstest.run(testIsWithinBounds);
    print("All " + jstest.testsRun + " tests passed on " + suiteName);
}

testJSGame();

