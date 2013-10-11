var merger = require("./merger");
var loader = require("./loader");

function GruntBuilder(grunt, options) {
    this.grunt = grunt;
    this.options = options;
    this.partsPath = options.partsPath || "parts";
    this.defaultPart = options.defaultPart || "default";
}
GruntBuilder.prototype.build = function (parts) {
    parts = parts || this.getParts();
        
    merger.init(this.grunt);
    var config = {}, self = this, module;
    parts.forEach(function (part) {
        module = loader.load(part, self.partsPath, self.grunt, self.options);
        module && merger.merge(config, module);
    });

    return config;
};
GruntBuilder.prototype.getParts = function () {
    var tasks = this.grunt.option("parts"), result;
    if (tasks) {
        return _.map(tasks.split(","), function (part) { return part.trim(); });
    }

    return [this.defaultPart];
};
GruntBuilder.prototype.reset = function () {
    loader.reset();
};
exports.GruntBuilder = GruntBuilder;

function createBuilder(grunt, options) {
    return new GruntBuilder(grunt, options);
}
exports.createBuilder = createBuilder;