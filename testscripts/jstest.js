// loosely based off minunit - http://www.jera.com/techinfo/jtns/jtn002.html
var jstest = function () {
    var pub = {};
    var currentSuite = "DefaultSuite";

    pub.testsRun = 0;

    pub.assert = function (message, test) {
        if (false == test)
            throw message;
    }

    pub.run = function (test) {
        try {
            test();
        } catch (err) {
            throw "Failed at " + currentSuite + " with: " + err;
        }
        pub.testsRun++;
    }

    pub.suite = function (suiteName) {
        currentSuite = suiteName;
    }

    return pub;
}();
