#!/usr/bin/env node

var _ = require('underscore'),
  program = require('commander'),
  updateNotifier = require('update-notifier'),
  package = require('./package.json'),
  mod = require('./'),
  logger = require('./lib/logger');

var notifier = updateNotifier();

program
  .version(package.version, '-v, --version')
  .description(package.description)
  .usage('command <args> [options]')
  .option('-l, --levels <levels>', 'process only certain levels of logging')
  .option('-n, --not-levels <levels>', 'process not certain levels of logging');

program.command('enable [input]')
  .description('enable stealth by replacing log calls with NOOPs')
  .action(enable);

program.command('restore [input]')
  .description('restore the NOOPs with their original log calls')
  .action(restore);

program.parse(process.argv);

if (program.args.length === 0 || typeof program.args[program.args.length - 1] === 'string') {
  notifier.update && notifier.notify();

  program.help();
}

function enable(input, env) {
  notifier.update && notifier.notify();

  var options = _options(env);

  var result = mod.enable(input, options);

  if (_.isArray(result)) {
    logger.ok('Enabled stealth in ' + result.length + ' files');
  }

  else if (_.isString(result)) {
    console.log(result);
  }
}

function restore(input, env) {
  notifier.update && notifier.notify();

  var options = _options(env);

  var result = mod.restore(input, options);

  if (_.isArray(result)) {
    logger.ok('Restored from stealth in ' + result.length + ' files');
  }

  else if (_.isString(result)) {
    console.log(result);
  }
}

function _options(o) {
  var opts = o.parent ? _options(o.parent) : {};

  _.each(o, function(v, k) {
    if (k[0] !== '_' && !_.isObject(v)) {
      opts[k] = v;
    }
  });

  return opts;
}