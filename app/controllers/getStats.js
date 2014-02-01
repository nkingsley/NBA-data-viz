var statModels = require('../models/statModels'),curl = require('curling'),_ = require('lodash'),
statControl = require('./statControl'),db = require('./database'), utils = require('./utils'),
ma = require('./movingAverage'), tp = require('./tradedPlayers'), mongoose = require('mongoose'), 
q = require('q'), playerDetails = require('./playerDetails'), 
allStats = {};
var processComplete = q.defer();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
config = require('../../config/config');

exports.start = function(){
  mongoose.connect(config.db, getAllStats);
  return processComplete.promise;
};


var compileStats = function(stats,headers,fix,missingTradeData){
  if (fix){
    headers = fixHeaders(headers);
  }
  for (var j = 0 ; j < stats.length; j++){
    var newPlayer = {};
    for (var k = 0 ; k < headers.length ; k++){
      if (stats[j][k] === null){
        stats[j][k] = 0;
      }
      newPlayer[headers[k]] = stats[j][k];
    }
    var newPId = newPlayer.PLAYER_ID;
    if (!missingTradeData){
      var action = tp.checkForTrades(newPlayer);    
    }
    if (action === 'SKIP'){
      continue;
    }
    allStats[newPId] = allStats[newPId] || {};
    //stats with missing trade data will always have the correct current team
    if (missingTradeData && tp.tradedPlayers[newPId]){
      allStats[newPId].TEAM_ABBREVIATION = newPlayer.TEAM_ABBREVIATION;
    }
    var curPlayerObj = allStats[newPId];
    allStats[newPId] = _.merge(curPlayerObj,newPlayer,
    function(a,b){
      return (a > b) ? a : b;
    });
  }
};

var getAllStats = function(){
  tp.all()
  .then(function(){
    db.checkDate(utils.dateTimeless())
    .then(function(needStatsToday){      
      if (!needStatsToday){
        console.log('process stopped.  Stats already gotten today');
        processComplete.resolve();
        mongoose.connection.close();
        return;
      }
      getBasicPlayerStats()
      .then(getTrackingData)
      .then(getOppShots)
      .then(function(){
        tp.giveNewTeam(allStats);
        playerDetails.getPlayerDetails(allStats)
        .then(function(){
          statControl.finish(allStats,tp.tradedPlayers)
          .then(function(finishedStats){
            var forMovingAverages = _.cloneDeep(finishedStats.Rawstat);
            ma.movingAverage(forMovingAverages)
            .then(function(){
              db.saveAll(finishedStats)
              .then(function(){
                getWinLoss()
                .then(function(){
                  mongoose.connection.close();
                  processComplete.resolve();
                });
              });
            });
          });
        });
      });
    });
  });
};

var getWinLoss = function(){
  var d = q.defer();
  curl.run("-X GET 'http://stats.nba.com/stats/leaguedashteamstats?Season=2013-14&AllStarSeason=2012-13&SeasonType=Regular+Season&LeagueID=00&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench=&ls=iref%3Anba%3Agnav&pageNo=1&rowsPerPage=30'",
  function(err,result){
    var data = JSON.parse(result.payload).resultSets[0];
    var result = []
    for (var i = 0 ; i < data.rowSet.length ; i++){
      result.push({franchise:data.rowSet[i][1],winPct:data.rowSet[i][5]});
    }
    db.saveOne({teams:result},'Winloss')
    .then(function(){
      d.resolve();
    });
  });
  return d.promise;
};

var getBasicPlayerStats = function(){
  var d = q.defer();
  curl.run("-X GET 'http://stats.nba.com/stats/leaguedashplayerstats?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&MeasureType=Base&PerMode=Totals&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench='", 
  function(err,result){
    var data = JSON.parse(result.payload).resultSets[0];    
    compileStats(data.rowSet,data.headers,false,true);
    d.resolve();
  });  
  return d.promise;
};

var getTrackingData = function(){
  var d = q.defer();
  var advUrls = [
    'http://stats.nba.com/js/data/sportvu/defenseData.js',
    'http://stats.nba.com/js/data/sportvu/speedData.js',
    'http://stats.nba.com/js/data/sportvu/passingData.js',
    'http://stats.nba.com/js/data/sportvu/touchesData.js',
    'http://stats.nba.com/js/data/sportvu/reboundingData.js',
    'http://stats.nba.com/js/data/sportvu/drivesData.js',
    'http://stats.nba.com/js/data/sportvu/catchShootData.js',
    'http://stats.nba.com/js/data/sportvu/pullUpShootData.js',
    'http://stats.nba.com/js/data/sportvu/shootingData.js'
  ];
  var gotten = 0;
  for (var i = 0 ; i < advUrls.length; i++){
    curl.run("-X GET '" + advUrls[i] + "'", 
    function(err,result){
      gotten++;
      var data = result.payload.slice(result.payload.indexOf(' = ') + 3);
      data = data.slice(0,data.length-1);
      data = JSON.parse(data).resultSets[0];
      stats = data.rowSet.sort(function(a,b){if (a[1] > b[1]){return 1;} else {return -1;}});
      compileStats(stats,data.headers);
      if(gotten === advUrls.length){
        d.resolve();
      }
    });  
  }
  return d.promise;
};

var getOppShots = function(trade){
  var d = q.defer();
  curl.run("-X GET 'http://stats.nba.com/stats/leaguedashplayershotlocations?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&MeasureType=Opponent&PerMode=Totals&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&DistanceRange=By+Zone&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench='", 
  function(err,result){
    var data = JSON.parse(result.payload).resultSets;
    //handle trades
    compileStats(data.rowSet,data.headers,true,true);
    //
    d.resolve();
  });
  return d.promise;
};

var fixHeaders = function(headers){
  //some stats have nested headers.  This concats the correct top-level header onto the lower-level header
  var newHeads = [];
  var topHeaderCounter = -1;
  for (var i = 0; i < headers[1].columnNames.length; i++){
    var colName = headers[1].columnNames[i];
    if (i < 4){
      newHeads.push(colName);
      continue;
    }
    if (i%3 === 1){
      topHeaderCounter++;
    }
    newHeads.push(colName.concat('_' + headers[0].columnNames[topHeaderCounter]
        .replace(/ /g,'_')
        .replace(/-/g,'_')
        .replace('(','')
        .replace(')','')
      )
    );
  }
  return newHeads;
};


exports.finished = exports.start();
