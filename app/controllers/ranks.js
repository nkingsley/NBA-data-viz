exports.rank = function(statsObj){
  var statsArray = makeArray(statsObj);
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
  cleanUp(statsObj);
  return rankings;
};

var makeArray = function(obj){
  var array = [];
  for (var key in obj){
    obj[key].tempName = key;
    array.push(obj[key]);
  }
  return array;
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

var cleanUp = function(obj){
  for (var key in obj){
    for(var stat in obj[key]){
      if (stat === 'tempName'){
        delete obj[key][stat];
      }
    }
  }
};

var sortCb = function(a,b,stat){
  if (a[stat] > b[stat]){
    return -1;
  } else {
    return 1;
  }
};