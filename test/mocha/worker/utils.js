var utils = require('../../../app/controllers/utils');
var should = require('should');

describe('Utils unit tests', function() {
  it('should calc diffs', function(done) {
    utils.diff({noah:{age:31}},{noah:{age:32}}).should.be.exactly(1);
  });
});