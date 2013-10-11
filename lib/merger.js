var grunt, _;
function init(_grunt) {
    if (!grunt) {
        grunt = _grunt;
        _ = grunt.util._;
    }
}
exports.init = init;

function merge() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1, length = arguments.length;

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !_.isFunction(target)) {
        target = {};
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (copy && (_.isPlainObject(copy) || (copyIsArray = _.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && _.isArray(src) ? src : [];
                        target[name] = _.chain(clone).union(copy).uniq().value();
                    }
                    else {
                        clone = src && _.isPlainObject(src) ? src : {};
                        target[name] = merge(clone, copy); // Never move original objects, clone them
                    }
                }
                    // Don't bring in undefined values
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}
exports.merge = merge;
