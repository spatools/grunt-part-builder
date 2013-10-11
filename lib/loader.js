var merger = require("./merger");
var path = require("path");

exports.loadAll = function loadAll(parts, prefix, grunt, options, result, loaded) {
    var cwd = process.cwd(),
        loaded = loaded || {},
        result = result || {},
        _ = grunt.util._;

    merger.init(grunt);

    _.each(parts, function (part) {
        if (!loaded[part]) {
            var modulePath = path.join(cwd, prefix, part),
                partModule = require(modulePath);

            if (!partModule)
                throw new Error("Part '" + part + "' does not exists at path: '" + modulePath + "' !");

            if (_.isFunction(partModule))
                partModule = partModule.call(grunt, options);

            loaded[part] = partModule;

            if (partModule.dependencies)
                exports.loadAll(partModule.dependencies, prefix, grunt, options, result, loaded);

            merger.merge(result, partModule);
        }
    });

    if (result.dependencies)
        delete result.dependencies;

    return result;
};

exports.load = function load(part, prefix, grunt, options) {
    var modulePath = path.join(process.cwd(), prefix, part),
        partModule = require(modulePath),
        _ = grunt.util._, result = {}, dependency;

    merger.init(grunt);

    if (!partModule)
        throw new Error("Part '" + part + "' does not exists at path: '" + modulePath + "' !");

    if (_.isFunction(partModule))
        partModule = partModule.call(grunt, options);

    if (partModule.dependencies) 
        exports.loadAll(partModule.dependencies, prefix, grunt, options, result, {});

    merger.merge(result, partModule);
    delete result.dependencies;

    return result;
}