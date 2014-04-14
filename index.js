var path = require('path'),
  fs = require('fs-extended'),
  _ = require('underscore'),
  logger = require('./lib/logger'),
  helpers = require('./lib/helpers');

exports.enable = enable;
exports.restore = restore;

function enable(input, opts) {
  return _process(input, opts, 'enable');
}

function restore(input, opts) {
  return _process(input, opts, 'restore');
}

function _process(input, opts, fn) {
  opts = helpers.init(input, opts);

  if (opts.type === 'code') {
    return helpers[fn](opts.input, opts);
  }

  var files = helpers.files(opts);
  var changed = [];

  _.each(files, function(file) {
    var content = fs.readFileSync(file).toString();

    if (!content) {
      return;
    }

    var processed = helpers[fn](content, opts);

    if (content !== processed) {
      changed.push(file);

      fs.writeFileSync(file, processed);
    }
  });

  return changed;
}