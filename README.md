# Ti Stealth [![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http:/appcelerator.com/alloy/)
 
CLI and CommonJS module to replace console log calls with NOOPs which can later be restored.

## Install [![npm](http://img.shields.io/npm/v/ti-stealth.png)](https://www.npmjs.org/package/ti-stealth)

As global CLI:

```
[sudo] npm install -g ti-stealth
```

As a dependency in your projects `package.json`:

```
{
  "name": "your-project",
  "dependencies": {
    "ti-stealth": "*"
  }
}
```

## Quick Start
Stealth can be used both as CLI and CommonJS module.

> *NOTE:* Be aware that running `ti-stealth` in your project root with no path will also affect the scripts in your modules folder for example. For an Alloy project you will want to run in or set the path to `app` and for classic `Resources`.

### Alloy.JMK
The number one usage for this package is to remove all other then error logging from production builds. The included example `alloy.jmk` can be dropped in your Alloy project's `app` folder or merged with whatever you have there. It will automatically stealth all the logs calls when you build for production (includes *Ad Hoc*), without changing anything in your `app` folder.

### CLI
Hit `ti-stealth -h` for full usage, but these examples should do:

- Processes all JS under the CWD (Alloy's `app` folder) to stealth all log calls:

	```
	~/myproject/app $ ti-stealth enable
	```
	
- Processes the given directory to stealth only debug and info level calls:

	```
	$ ti-stealth enable ~/myproject/app -l debug,info
	```
	
- Processes the given file to stealth all but error level caals:

	```
	$ ti-stealth enable ~/myproject/app/alloy.js -n error
	```	
	
- Processes the given file to restore all stealthed info level log calls:

	```
	$ ti-stealth restore ~/myproject/app/alloy.js -l info
	```	
	
- Process the given code:

	```
	$ ti-stealth enable "Ti.API.info('hello world')"
	```
	
	Pretty useless in CLI, but nice via the module ;)


### Module
If you use Stealth as a CommonJS module pass the input as the first argument and the options as the second. You will be returned an array of files changed:

```
var stealth = require('ti-stealth');

stealth.enable('/usr/admin/myproject/app', {
	notLevels: ['error']
});
```

Some notes:

- You can also pass the options as the first argument and have a `input` property.
- Levels can be given as CSV as well.
- You can use both short and long option names.

## Tests [![Travis](http://img.shields.io/travis/FokkeZB/ti-stealth.png)](https://travis-ci.org/FokkeZB/ti-stealth)

1. Install [node.js](http://nodejs.org/).
2. Install [grunt](http://gruntjs.com/): `[sudo] npm install -g grunt-cli`
3. Clone the repo: `git clone https://github.com/fokkezb/ti-stealth.git && cd ti-stealth && npm install`
4. Run tests: `grunt test`

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/ti-stealth/issues).

## License

Distributed under [MIT License](LICENSE).
