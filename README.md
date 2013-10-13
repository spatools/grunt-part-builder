# grunt-part-builder [![NPM version](https://badge.fury.io/js/grunt-part-builder.png)](http://badge.fury.io/js/grunt-part-builder)

[Grunt][grunt] Part Builder - Merge multiple configuration parts, manage dependency, enable complex part building.

## Getting Started

Install this grunt plugin next to your project's gruntfile with: `npm install grunt-part-builder --save-dev`

Then add this line to your project's `Gruntfile.js` :

```javascript
var partBuilder = require("grunt-part-builder");
```

Then specify a configuration for builder :

```javascript
var builder = partBuilder.createBuilder(grunt, {
	dev: grunt.option("dev") || false,
	output: grunt.option("output") || "build"
});
```

Then build your configuration :

```javascript
grunt.initConfig(builder.build());
```

Done, you can now build with custom tasks :

```
grunt --parts=part1,part2
```

*Note: If no parts specified, grunt-part-builder search for a **default** part*

## Creating parts

To create configuration parts, create a **parts** folder in your project dir.
Add your configuration chunks into this directory.

*You can specifiy a different directory by setting prefix in input options*

A part is simply a chunk of Grunt configuration.
All parts chunks area merged during build. Arrays are merged, object are extended and dependencies are loaded.

### Static configuration

Simply exports an object representing your Grunt configuration.

```javascript
module.exports = {
	dependencies: ["dep1", "dep2"],

	concat: { /* ... */ },
	cssmin: { /* ... */ },
	copy: { /* ... */ },
	watch: { /* ... */ },
	// ...
};
```

### Dynamic configuration

Return a function which take an argument and return a Grunt configuration chunk.
The argument is the configuration which is given to builder during its creation.

```javascript
module.exports = function(options) {
	var includeDev = [];
	if (options.dev)
		includeDev.push("dev1.js", "dev2.js");

	return {
		dependencies: ["dep3"],
		
		concat: { /* ... */ },
		cssmin: { /* ... */ },
		copy: { 
			main: {
				src: ["file1.js", "file2.js"].concat(includeDev)
			}
		}
	};
};
```

[grunt]: https://github.com/gruntjs/grunt

## Release History
* 0.1.0 
	* Initial Release
	* Build multiple parts
	* Apply dependencies
	* Create custom options to pass to parts
	* Allow objects and function parts
* 0.1.1 
	* Fix issue in loader when loading many parts which have redondant dependencies
	* Optimize builder execution time
* 0.1.2
	* Allow configurations to define task to be registered
	* Optimize custom build support
* 0.1.3
	* Allow options.defaultPart to be an array