var merger = require("./merger");
var loader = require("./loader");

function GruntBuilder(grunt, options) {
    this._ = grunt.util._;
    this.grunt = grunt;
    this.options = options;
    this.partsPath = options.partsPath || "parts";
    this.defaultPart = options.defaultPart || "default";
}
GruntBuilder.prototype.build = function (parts) {
    parts = this.getParts(parts);
    var config = loader.loadAll(parts, this.partsPath, this.grunt, this.options);

    if (config.build) {
       this._.each(config.build, function (tasks, name) {
            this.grunt.registerTask(name, tasks);
        }, this);

        delete config.build;
    }

    return config;
};
GruntBuilder.prototype.getParts = function (parts) {
    var tasks = parts || this.grunt.option("parts") || this.defaultPart;
    if (this._.isString(tasks))
        return this._.map(tasks.split(","), function (part) { return part.trim(); });

    return tasks;
};
exports.GruntBuilder = GruntBuilder;

function createBuilder(grunt, options) {
    return new GruntBuilder(grunt, options);
}
exports.createBuilder = createBuilder;