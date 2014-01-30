var utils = require('./utils'), mongoose = require('mongoose'),
db = require('./database'), statControl = require('./statControl'), q = require('q');

exports.movingAverage = function(rawStats){
  var d = q.defer();
  var date = utils.dateTimeless();
  date.setDate(date.getDate()-1);
  mongoose.model("Rawstat").find({created: date})
  .exec(function(err,old){
    if (old.length === 0){
      d.resolve();
      return d.promise;
    }
    old = utils.toObj(old, "PLAYER_ID");
    var diff = utils.diff(old,rawStats);
    utils.reverseTags(diff);
    statControl.finish(diff,false,true)
    .then(function(megaStats){
      megaStats.Pnmovavg = megaStats.Playernorm;
      delete megaStats.Playernorm;
      megaStats.Tnmovavg = megaStats.Teamnorm;
      delete megaStats.Teamnorm;
      megaStats.Rawmovavg = megaStats.Rawstat;
      delete megaStats.Rawstat;
      db.saveAll(megaStats)
      .then(function(){
        d.resolve();
      })
    });
  });
  return d.promise;
};