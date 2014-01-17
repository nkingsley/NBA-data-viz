exports.rank = function(statsObj){
  var statsArray = makeArray(statsObj);
  var allSorts = sortByEverything(statsArray);

};

var makeArray = function(obj){
  var array = [];
  for (var key in obj){
    array.push()
  }
};

var sortByEverything = function(statsArray){
  var allSorts = {};
  for (var stat in statsArray[0]){
    var sorted = statsArray.sort(
      function(a,b){
       return sortCb(a,b,stat);
      });
    allSorts[stat] = sorted;
  }
  return allSorts;
};

var sortCb = function(a,b,stat){
  if (a[stat] > b[stat]){
    return 1;
  } else {
    return -1;
  }
};