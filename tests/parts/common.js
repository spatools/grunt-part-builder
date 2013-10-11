module.exports = function (options) {
    var min = !options.dev ? ".min" : "";

    return {
        concat: {
            styles: {
                src: [
                    "basefile1.css",
                    "basefile2.css"
                ],
                dest: options.output + "/styles.css"
            },
            scripts: {
                src: [
                    "basefile1.js",
                    "basefile2.js",
                    "basefile3.js",
                    "basefile4.js"
                ],
                dest: options.output + "/app.js"
            },
            libs: {
                src: [
                    "library1" + min + ".js",
                    "library2" + min + ".js",
                    "library3" + min + ".js"
                ],
                dest: options.output + "/libs.js"
            }
        },

        build: {
            default: ["concat:styles", "concat:libs", "concat:scripts"]
        }
    }
}