var merge = require("./merge");
var cache = {};

function load(part, prefix, grunt, options) {
    if (cache[part])
        return cache[part];

    var partModule = require(prefix + part),
        _ = grunt.util._, dependency;

    if (!partModule)
        throw new Error("Part " + part + " does not exists !");

    if (_.isFunction(partModule))
        partModule = partModule.call(grunt, options);

    if (partModule.dependencies) {
        partModule.dependencies.forEach(function (name) {
            dependency = load(name, prefix, grunt, options);
            merge(partModule, dependency);
        });
        delete partModule.dependencies;
    }

    cache[part] = partModule;
}
exports.load = load;