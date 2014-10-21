var _ = require('underscore'),
  should = require('should'),
  helpers = require('../lib/helpers'),
  constants = require('../lib/constants');

describe('helpers', function() {

  describe('init with defaults', function() {

    var opts = helpers.init();

    it('should return an object with expected properties', function() {
      opts.should.be.an.Object.and.have.properties('input', 'type', 'levels');
    });

    it('should have a input property containing our CWD', function() {
      opts.input.should.equal(process.cwd());
    });

    it('should have a type property equal to "dir"', function() {
      opts.type.should.equal('dir');
    });

    it('should have a levels property containing all default levels', function() {
      opts.levels.should.be.an.Array.and.eql(constants.LEVELS);
    });

  });

  describe('init with code & string levels', function() {

    var custom = {
      input: 'Some code',
      l: 'error,debug'
    };

    var opts = helpers.init(custom);

    it('should have a input property containing our custom input', function() {
      opts.input.should.equal(custom.input);
    });

    it('should have a type property equal to "code"', function() {
      opts.type.should.equal('code');
    });

    it('should have a levels property containing only error and debug', function() {
      opts.levels.should.be.an.Array.and.eql(['error', 'debug']);
    });

  });

  describe('init with file & array of negative levels', function() {

    var custom = {
      input: __filename,
      notLevels: ['error']
    };

    var opts = helpers.init(custom);

    it('should have a input property containing our custom input', function() {
      opts.input.should.equal(custom.input);
    });

    it('should have a type property equal to "file"', function() {
      opts.type.should.equal('file');
    });

    it('should have a levels property containing only error and debug', function() {
      opts.levels.should.be.an.Array.and.eql(_.without(constants.LEVELS, 'error'));
    });

  });

});