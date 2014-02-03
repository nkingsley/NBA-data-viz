var curl = require('curling'), q = require('q'), db = require('./database');

exports.getPlayerDetails = function(allStats){
  var d = q.defer();
  console.log('hitplayerdetails');
  if (true){//get new player position deets by setting to false
    db.getPlayerDetails()
    .then(function(deets){
      console.log('deets gotten from db')
      addPosition(allStats,deets);
      console.log('deets added to players')
      d.resolve();
    });
    return d.promise;
  }
  var players = [];
  var subroutine = function(index,keys){
    if (index === keys.length -1){
      db.saveOne({players:players},'Playerdetail');
      addPosition(allStats,players);
      d.resolve();
      return;
    }
    var keep = {
      "PERSON_ID" : true,
      "BIRTHDATE" : true,
      "PIE" : true,
      "POSITION": true
    };
    var id = keys[index];
    var url = 'http://stats.nba.com/stats/commonplayerinfo/?PlayerID=' + id + '&SeasonType=Regular+Season&LeagueID=00';
    curl.run("-X GET '" + url + "'"
    , function(err,result){
      var payload = JSON.parse(result.payload).resultSets[0];
      var newPlayer = {};
      for (var i in payload.headers){
        var head = payload.headers[i];
        if (keep[head]){
          newPlayer[head] = payload.rowSet[0][i];
        }
      }
      players.push(newPlayer);
      subroutine(index+1,keys);
    });
  };
  subroutine(0,Object.keys(allStats));
  return d.promise;
};

var addPosition = function(stats,details){
  for (var i = 0 ; i < details.length ; i++){
    var player = stats[details[i].PERSON_ID];
    player.Position = details[i].POSITION;
    player.Birthdate = details[i].BIRTHDATE;
  }
};
