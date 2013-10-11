var grunt = require("grunt");
var merger = require("../lib/merger");

module.exports.merger = {
    setUp: function (callback) {
        merger.init(grunt);
        callback();
    },
    merge: function (test) {
        test.expect(4);

        var part1 = require("./parts/part1"),
            part2 = require("./parts/part2"),
            result = {};

        merger.merge(result, part1);
        merger.merge(result, part2);

        test.equal(result.dependencies.length, 2, "After build it must have 2 on 3 dependencies (2 are same) in result object");
        test.equal(result.concat.styles.src.length, 5, "After build it must have 5 files in concat styles src array");
        test.equal(result.concat.scripts.src.length, 4, "After build it must have 4 files in concat scripts src array");
        test.equal(result.concat.libs.src.length, 1, "After build it must have 1 file in concat libs src array");

        test.done();
    }
};