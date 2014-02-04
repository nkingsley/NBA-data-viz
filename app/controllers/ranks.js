//not being used currently

var utils = require('./utils');

exports.rank = function(statsObj){
  var statsArray = utils.toArray(statsObj);
  var allSorts = sortByEverything(statsArray);
  var rankings = {};
  for (var stat in allSorts){
    for (var i = 0; i < allSorts[stat].length ; i++){
      var item = allSorts[stat][i];
      if (stat === 'tempName'){continue;}
      rankings[item.tempName] = rankings[item.tempName] || {};
      if (typeof statsObj[item.tempName][stat] === "string"){
        rankings[item.tempName][stat] = statsObj[item.tempName][stat];
      } else{
      rankings[item.tempName][stat] = i + 1;        
      }
    }
  }
  utils.cleanUp(statsObj);
  return rankings;
};

var sortByEverything = function(statsArray){
  var allSorts = {};
  for (var stat in statsArray[0]){
    var sorted = statsArray.sort(
      function(a,b){
       return sortCb(a,b,stat);
      });
    allSorts[stat] = sorted.slice();
  }
  return allSorts;
};

var sortCb = function(a,b,stat){
  if (a[stat] > b[stat]){
    return -1;
  } else {
    return 1;
  }
};