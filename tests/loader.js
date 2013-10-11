var grunt = require("grunt");
var loader = require("../lib/loader");

module.exports.loader = {
    setUp: function(callback) {
        callback();
    },
    tearDown: function(callback) {
        loader.reset();
        callback();
    },
    load: function (test) {
        test.expect(6);

        var part1 = loader.load("part1", "tests/parts/", grunt, {}),
            part2 = loader.load("part2", "tests/parts/", grunt, {});

        test.equal(part1.concat.styles.src.length, 4, "After load with dependencies, part1 must contain 4 files in concat styles src array");
        test.equal(part1.concat.scripts.src.length, 6, "After load with dependencies, part1 must contain 6 files in concat scripts src array");
        test.equal(part1.concat.libs.src.length, 3, "After load with dependencies, part1 must contain 3 files in libs src array");

        test.equal(part2.concat.styles.src.length, 6, "After load with dependencies, part2 must contain 6 files in concat styles src array");
        test.equal(part2.concat.scripts.src.length, 7, "After load with dependencies, part2 must contain 7 files in concat scripts src array");
        test.equal(part2.concat.libs.src.length, 4, "After load with dependencies, part2 must contain 4 files in libs src array");

        test.done();
    }
};
