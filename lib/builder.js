var merge = require("./merge");
var loader = require("./loader");

function GruntBuilder(grunt, options) {
    this.grunt = grunt;
    this.options = options;
    this.prefix = options.prefix;
    this.defaultPart = options.defaultPart || "default";
}
GruntBuilder.prototype.build = function (parts) {
    parts = parts || this.getParts();
        
    var config = {}, self = this, module;
    parts.forEach(function (part) {
        module = loader.load(part, self.prefix, self.grunt, self.options);
        module && merge(config, module);
    });

    return config;
};
GruntBuilder.prototype.getParts = function () {
    var tasks = grunt.option("parts"), result;
    if (tasks) {
        return _.map(tasks.split(","), function (part) { return part.trim(); });
    }

    return [this.defaultPart];
};
exports.GruntBuilder = GruntBuilder;

function createBuilder(grunt, options) {
    return new GruntBuilder(grunt, options);
}
exports.createBuilder = createBuilder;