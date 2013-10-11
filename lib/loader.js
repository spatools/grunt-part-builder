var merger = require("./merger");
var path = require("path");
var cache = {};

exports.load = function load(part, prefix, grunt, options) {
    if (!cache[part]) {
        merger.init(grunt);
        var modulePath = path.join(process.cwd(), prefix, part),
            partModule = require(modulePath),
            _ = grunt.util._, result = {}, dependency;

        if (!partModule)
            throw new Error("Part '" + part + "' does not exists at path: '" + modulePath + "' !");

        if (_.isFunction(partModule))
            partModule = partModule.call(grunt, options);

        if (partModule.dependencies) {
            partModule.dependencies.forEach(function (name) {
                dependency = load(name, prefix, grunt, options);
                merger.merge(result, dependency);
            });
        }

        merger.merge(result, partModule);
        delete result.dependencies;

        cache[part] = result;
    }

    return cache[part];
}

exports.reset = function reset() {
    cache = {};
};
