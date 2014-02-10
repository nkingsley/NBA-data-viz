//for backfilling
var statModels = require('../models/statModels');

var utils = require('./utils'), mongoose = require('mongoose'),
db = require('./database'), statControl = require('./statControl'), q = require('q');

//for backfilling
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
config = require('../../config/config');
var counter = 0;

exports.movingAverage = function(rawStats, offset){
  offset = offset || 0;
  var d = q.defer();
  var date = utils.dateTimeless();
  date.setDate(date.getDate()-10 - offset);
  var datePlus = new Date(date);
  datePlus.setDate(date.getDate()+1);
  mongoose.model("Rawstat").find({created: date})
  .exec(function(err,old){
    if (old.length === 0){
      d.resolve();
      return d.promise;
    }
    var pid = old[0].PLAYER_ID;
    old = utils.toObj(old, "PLAYER_ID");
    var diff = utils.diff(old,rawStats);  
    if (!diff[pid]){
      d.resolve();
      return d.promise;
    }
    utils.reverseTags(diff);
    statControl.finish(diff,false,true)
    .then(function(megaStats){
      megaStats.Pnmovavg = megaStats.Playernorm;
      delete megaStats.Playernorm;
      megaStats.Tnmovavg = megaStats.Teamnorm;
      delete megaStats.Teamnorm;
      delete megaStats.Rawstat;
      db.saveAll(megaStats,offset)
      .then(function(){
        d.resolve();
      });
    });
  });
  return d.promise;
};

var makeAllMovingAverages = function(date){
  if (date && date < new Date('01-28-2014')){
    return;
  }
  date && date.setDate(date.getDate()-1);
  date = date || utils.dateTimeless();
  mongoose.model('Rawstat').find({created:date})
  .exec(function(err,stats){
    exports.movingAverage(utils.toObj(stats, "PLAYER_ID"),counter)
    .then(function(){
      counter++;
      makeAllMovingAverages(date);
    });
  });
};
exports.start = function(){
  mongoose.connect(config.db, makeAllMovingAverages);
};