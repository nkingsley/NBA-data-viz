/**
* Module dependencies.
*/
var rangeCheck = function(data,bottom,top){
  for(var i = 0; i < data.length ; i++){
    for (var stat in data[i]){
      if (!maps.map[stat] || !maps.map[stat].name || stat === 'toString'){
        continue;
      }
      if (!( data[i][stat] <= top || data[i][stat] >= bottom)){
        console.log(stat,data[i][stat]);
        return false;
      }
    }
  }
  return true;
}

var dateCheck = function(data){
  if (JSON.stringify(data[0].created) !== (JSON.stringify(utils.dateTimeless()))) {
    return false;
  }
  return true;
};
var dirtyCheck = function(data){
  for(var i = 0; i < data.length ; i++){
    for (var stat in data[i]){
      if (!maps.map[stat] || !maps.map[stat].name || stat === 'toString'){
        continue;
      }
      if (!( data[i][stat] <= 0 || data[i][stat] > 0)){
        console.log(stat,data[i][stat]);
        return true;
      }
    }
  }
  return false
}
var mongoose = require('mongoose');
var utils = require('../../../app/controllers/utils');
var maps = require('../../../app/controllers/map');
var should = require('should');
var go = require('../../../app/controllers/getStats');
describe('Worker E2E Testing', function() {
  this.timeout(150000000);
  before(function(done){
    go.finished.then(function(){
      mongoose.connect('mongodb://localhost/mean-test', done);
    });
  })
  describe('Data Checking', function() {
    describe('Playernorms', function() {
      it('should return hundreds of "clean" players', function(done) {
        mongoose.model('Playernorm')
        .find(function(err,data){
          should.exist(data);
          data.should.be.an.instanceOf(Array);
          data.length.should.be.greaterThan(400);
          data.length.should.be.lessThan(600);
          data[0].should.be.an.instanceOf(Object).and.have.property('PLAYER_ID');
          dateCheck(data).should.be.exactly(true);
          dirtyCheck(data).should.be.exactly(false);
          done();
        });
      });
      it('should return 30 clean teams', function(done){
        mongoose.model('Teamnorm')
        .find(function(err,data){
          should.exist(data);
          data.should.be.an.instanceOf(Array);
          data.length.should.be.exactly(30);
          data[0].should.be.an.instanceOf(Object).and.have.property('Team');
          dateCheck(data).should.be.exactly(true);
          dirtyCheck(data).should.be.exactly(false);
          rangeCheck(data,0,1).should.be.exactly(true);
          done();
        });
      });
      it('should get wins and losses', function(done){
        mongoose.model('Winloss')
        .find(function(err,data){
          data.length.should.be.exactly(1);
          dateCheck(data).should.be.exactly(true);
          done();
        });
      });
    });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase();
    done();
  });
});
