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
    return loader.loadAll(parts, this.partsPath, this.grunt, this.options);
};
GruntBuilder.prototype.getParts = function () {
    var tasks = this.grunt.option("parts"), result;
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