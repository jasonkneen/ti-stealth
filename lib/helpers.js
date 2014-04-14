var _ = require('underscore'),
  fs = require('fs-extended'),
  logger = require('./logger'),
  constants = require('./constants');

exports.init = init;
exports.files = files;
exports.enable = enable;
exports.restore = restore;

function files(opts) {

  switch (opts.type) {

    case 'file':
      return [opts.input];

    case 'dir':
      return fs.listFilesSync(opts.input, {
        recursive: true,
        prependDir: true,
        filter: function(filePath) {
          return filePath.match(/\.js$/);
        }
      });
  }

  throw "Unknown 'input' type '" + opts.type + "'.";
}

function init(input, opts) {

  // 1st argument is options, with input specified as property
  if (_.isObject(input)) {
    opts = input;
  }

  // 1st argument is input, 2nd argument is options
  else {
    opts = (!opts || !_.isObject(opts)) ? {} : opts;
    opts.input = input;
  }

  // no input
  if (!opts.input) {

    // no CWD when executed as CommonJS module
    if (!process) {
      throw "Missing 'input' option telling me what to process.";
    }

    logger.debug('Assuming you want me to process the current working directory.');

    opts.input = process.cwd();
    opts.type = 'path';
  }

  // input given
  else {

    // input is code
    if (opts.input.match(/[\n\r]/) || !fs.existsSync(opts.input)) {
      opts.type = 'code';
    }

    // input is dir or file
    else {
      var stat = fs.statSync(opts.input);

      opts.type = stat.isDirectory() ? 'dir' : 'file';
    }

    logger.debug("Assuming your 'input' is " + opts.type + ".");
  }

  if (opts.l) {
    opts.levels = l;
    delete opts.l;
  }

  if (_.isString(opts.levels)) {
    opts.levels = opts.levels.split(',');
  }

  if (!opts.levels || !_.isArray(opts.levels)) {
    opts.levels = constants.LEVELS;
  }

  return opts;
}

function enable(code, opts) {
  return code.replace(new RegExp(_regexp(opts), 'g'), '(function(){/*$1*/})');
}

function restore(code, opts) {
  return code.replace(new RegExp('\\(function\\(\\)\{\\/\\*' + _regexp(opts) + '\\*\\/\\}\\)', 'g'), '$1');
}

function _regexp(opts) {
  return '((?:console|Ti(?:tanium)?.API).(?:' + opts.levels.join('|') + '))';
}