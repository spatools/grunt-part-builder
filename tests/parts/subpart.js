module.exports = {
    concat: {
        styles: {
            src: ["subpartfile.css"]
        },
        scripts: {
            src: ["subpartfile.js"]
        }
    },

    copy: {
        scripts: {
            src: ["suppartfiletocopy.js"]
        }
    },

    build: {
        default: ["copy:scripts"]
    }
};