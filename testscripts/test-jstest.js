load("testscripts/jstest.js");

function testCase() {
    var foo = 7;
    var bar = 5;

    function testFoo() {
        jstest.assert("error, foo != 7", foo == 7);
    }

    function testBar() {
        jstest.assert("error, bar != 5", bar == 5);
    }

    jstest.suite("JSTestSuite");
    jstest.run(testFoo);
    jstest.run(testBar);
}

testCase();
print("All tests passed!");
print("Tests run: " + jstest.testsRun);
