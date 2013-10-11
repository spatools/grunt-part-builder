var grunt = require("grunt");
var partbuilder = require("../lib/builder");
var _ = grunt.util._;

var builder1, builder2;

function hasMinInPath(config) {
    return _.any(config.concat.libs.src, function(src) { return src.indexOf(".min") !== -1; });
}

module.exports.builder = {
    setUp: function (callback) {
        builder1 = partbuilder.createBuilder(grunt, { partsPath: "tests/parts", output: "test" });
        builder2 = partbuilder.createBuilder(grunt, { partsPath: "tests/parts", dev: true, output: "dev" });

        callback();
    },
    tearDown: function (callback) {
        builder1.reset();
        builder2.reset();
        builder1 = builder2 = null;
        callback();
    },
    default: function (test) {
        test.expect(8);

        var config = builder1.build();
        
        test.equal(config.dependencies, undefined, "After build, dependencies must not contain dependencies configuration");

        test.equal(config.concat.styles.src.length, 8, "After entire build, config must contain 8 files in concat styles src array");
        test.equal(config.concat.scripts.src.length, 9, "After entire build, config must contain 9 files in concat scripts src array");
        test.equal(config.concat.libs.src.length, 4, "After entire build, config must contain 4 files in libs src array");

        test.ok(hasMinInPath(config), "Without dev option, libs must contain minified paths");

        test.equal(config.concat.styles.dest, "test/styles.css");
        test.equal(config.concat.scripts.dest, "test/app.js");
        test.equal(config.concat.libs.dest, "test/libs.js");

        test.done();
    },
    devoption: function (test) {
        test.expect(8);

        var config = builder2.build();

        test.equal(config.dependencies, undefined, "After build, dependencies must not contain dependencies configuration");

        test.equal(config.concat.styles.src.length, 8, "After entire build, config must contain 8 files in concat styles src array");
        test.equal(config.concat.scripts.src.length, 9, "After entire build, config must contain 9 files in concat scripts src array");
        test.equal(config.concat.libs.src.length, 4, "After entire build, config must contain 4 files in libs src array");

        test.ok(!hasMinInPath(config), "With dev, libs must not contain minified paths");

        test.equal(config.concat.styles.dest, "dev/styles.css");
        test.equal(config.concat.scripts.dest, "dev/app.js");
        test.equal(config.concat.libs.dest, "dev/libs.js");

        test.done();
    },
    custom: function (test) {
        var config = builder2.build(["part1"]);

        test.equal(config.dependencies, undefined, "After build, dependencies must not contain dependencies configuration");

        test.equal(config.concat.styles.src.length, 4, "After part1 build, config must contain 4 files in concat styles src array");
        test.equal(config.concat.scripts.src.length, 6, "After part1 build, config must contain 6 files in concat scripts src array");
        test.equal(config.concat.libs.src.length, 3, "After part1 build, config must contain 3 files in libs src array");

        test.ok(!hasMinInPath(config), "With dev, libs must not contain minified paths");

        test.equal(config.concat.styles.dest, "dev/styles.css");
        test.equal(config.concat.scripts.dest, "dev/app.js");
        test.equal(config.concat.libs.dest, "dev/libs.js");

        test.done();
    }
};
