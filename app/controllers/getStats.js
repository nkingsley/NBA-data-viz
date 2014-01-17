var curl = require('curling');
var _ = require('lodash');
var normer = require('./rawStatsToNorms');
var urlsToGet = 12;
var urlsGotten = 0;
var allStats = {};
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

var persistStats = function(stats){
  //save to db
};

var compileStats = function(stats,headers,fix){
  urlsGotten++;
  if (fix){
    headers = fixHeaders(headers);
  }
  for (var j = 0 ; j < stats.length; j++){
    var statsObj = {};
    for (var k = 0 ; k < headers.length ; k++){
      if (stats[j][k] === null){
        stats[j][k] = 0;
      }
      statsObj[headers[k]] = stats[j][k];
    }
    allStats[statsObj['PLAYER_ID']] = allStats[statsObj['PLAYER_ID']] || {};
    var curPlayerObj = allStats[statsObj['PLAYER_ID']];
    allStats[statsObj['PLAYER_ID']] = _.merge(allStats[statsObj['PLAYER_ID']],statsObj, function(a,b){
      return (a > b) ? a : b;
    });
  }
  if (urlsGotten === urlsToGet){
    var norms = normer.finish(allStats);
    exports.stats = norms;
    // persistStats(allStats);
  }
};

var urls = [
'http://stats.nba.com/stats/leaguedashplayershotlocations?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&MeasureType=Base&PerMode=Totals&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&DistanceRange=By+Zone&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench=&pageNo=1&rowsPerPage=25',
'http://stats.nba.com/stats/leaguedashplayershotlocations?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&MeasureType=Opponent&PerMode=Totals&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&DistanceRange=By+Zone&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench='
];
for (var i = 0 ; i < urls.length; i++){
  curl.run("-X GET '" + urls[i] + "'"
  , function(err,result){
    var data = JSON.parse(result.payload).resultSets;
    compileStats(data.rowSet,data.headers,true);
  });
}
curl.run("-X GET 'http://stats.nba.com/stats/leaguedashplayerstats?Season=2013-14&SeasonType=Regular+Season&LeagueID=00&MeasureType=Base&PerMode=Totals&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench='", function(err,result){
  var data = JSON.parse(result.payload).resultSets[0];
  compileStats(data.rowSet,data.headers);
});

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

for (var i = 0 ; i < advUrls.length; i++){
  curl.run("-X GET '" + advUrls[i] + "'", function(err,result){
    var data = result.payload.slice(result.payload.indexOf(' = ') + 3);
    data = data.slice(0,data.length-1);
    data = JSON.parse(data).resultSets[0];
    stats = data.rowSet.sort(function(a,b){if (a[1] > b[1]){return 1;} else {return -1;}});
    compileStats(stats,data.headers);
  });  
}