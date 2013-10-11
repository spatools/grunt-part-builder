module.exports = {
    dependencies: ["common", "subpart"],

    concat: {
        styles: {
            src: [
                "part2file1.css",
                "part2file2.css",
                "part2file3.css"
            ]
        },
        scripts: {
            src: [
                "part2file1.js",
                "part2file2.js"
            ]
        },
        libs: {
            src: [
                "library4.js"
            ]
        }
    }
};