load("testscripts/jstest.js");

function testCase() {
    var suiteName = "JSTestSuite";

    var foo = 7;
    var bar = 5;

    function testFoo() {
        jstest.assert("error, foo != 7", foo == 7);
    }

    function testBar() {
        jstest.assert("error, bar != 5", bar == 5);
    }

    jstest.suite(suiteName);
    jstest.run(testFoo);
    jstest.run(testBar);
    print("All " + jstest.testsRun + " tests passed on " + suiteName);
}

testCase();
