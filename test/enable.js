var path = require('path'),
  fs = require('fs-extended'),
  _ = require('underscore'),
  should = require('should'),
  constants = require('../lib/constants'),
  mod = require('../');

var tmpDir = path.join(__dirname, 'tmp');
var tmpFile = path.join(tmpDir, 'app.js');

describe('enable', function() {

  describe('dir', function() {
    fs.copyDirSync(path.join(__dirname, 'statics'), tmpDir);

    var result = mod.enable(tmpDir);
    var content = fs.readFileSync(tmpFile).toString();

    it('should return an array with the file in our input dir in it', function() {
      result.should.eql([tmpFile]);
    });

    it('should have no more Ti.API.* and console.* calls', function() {
      content.should.not.match(new RegExp('(console|Ti(tanium)?.API).(' + constants.LEVELS.join('|') + ')\\(', 'g'));
    });

    fs.deleteDirSync(tmpDir);
  });

  describe('file with 2 levels', function() {
    fs.copyDirSync(path.join(__dirname, 'statics'), tmpDir);

    var levels = ['info', 'error'];

    var result = mod.enable(tmpFile, {
      levels: levels
    });

    var content = fs.readFileSync(tmpFile).toString();

    it('should return an array with our input file in it', function() {
      result.should.eql([tmpFile]);
    });

    it('should have no more Ti.API.info|error and console.info|error calls', function() {
      content.should.not.match(new RegExp('(console|Ti(tanium)?.API).(' + levels.join('|') + ')\\(', 'g'));
    });

    it('should still have the other Ti.API.* and console.* calls', function() {
      content.should.match(new RegExp('(console|Ti(tanium)?.API).(' + _.difference(constants.LEVELS, levels).join('|') + ')\\(', 'g'));
    });

    fs.deleteDirSync(tmpDir);
  });

  describe('code', function() {
    fs.copyDirSync(path.join(__dirname, 'statics'), tmpDir);

    var input = fs.readFileSync(tmpFile).toString();

    var result = mod.enable(input);

    it('should return a string', function() {
      result.should.be.a.String;
    });

    it('should have no more Ti.API.* and console.* calls', function() {
      result.should.not.match(new RegExp('(console|Ti(tanium)?.API).(' + constants.LEVELS.join('|') + ')\\(', 'g'));
    });

    fs.deleteDirSync(tmpDir);
  });

});

describe('restore', function() {
  fs.copyDirSync(path.join(__dirname, 'statics'), tmpDir);

  var enableResult = mod.enable(tmpFile);
  var enableContent = fs.readFileSync(tmpFile).toString();

  it('should first enable', function() {
    enableResult.should.eql([tmpFile]);
  });

  it('should have no more Ti.API.* and console.* calls', function() {
    enableContent.should.not.match(new RegExp('(console|Ti(tanium)?.API).(' + constants.LEVELS.join('|') + ')\\(', 'g'));
  });

  var restoreResult = mod.restore(tmpFile);
  var restoreContent = fs.readFileSync(tmpFile).toString();

  it('should then restore', function() {
    restoreResult.should.eql([tmpFile]);
  });

  it('should again have Ti.API.* and console.* calls', function() {
    restoreContent.should.match(new RegExp('(console|Ti(tanium)?.API).(' + constants.LEVELS.join('|') + ')\\(', 'g'));
  });

  fs.deleteDirSync(tmpDir);

});