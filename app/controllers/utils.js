var maps = require('./map');
var reverseMap = maps.reverseMap();

exports.toArray = function(obj){
  var array = [];
  for (var key in obj){
    obj[key].tempName = key;
    array.push(obj[key]);
  }
  return array;
};

exports.reverseTags = function(collection){
  var map = maps.reverseMap();
  for (var item in collection){
    for (var stat in collection[item]){
      var name = map[stat].name || map[stat].keep;
      var temp = collection[item][stat];
      delete collection[item][stat];
      collection[item][name] = temp;
    }
  }
};

exports.cleanUp = function(obj){
  for (var key in obj){
    for(var stat in obj[key]){
      if (stat === 'tempName'){
        delete obj[key][stat];
      }
    }
  }
};

exports.toObj = function(array,key){
  var obj = {};
  if (!Array.isArray(array) || !key){
    return false;
  }
  for (var i = 0 ; i < array.length ; i++){
    obj[array[i][key]] = array[i];
  }    
  return obj;
};

exports.diff = function(startData,endData){
  var diff = {};
  for (var item in startData){
    diff[item] = diff[item] || {};
    for (var stat in startData[item]){
      if (!endData[item][stat] && startData[item][stat] && endData[item][stat] !== 0){
        console.log('at->',stat,'this->',startData[item],'doesnt match this->',endData[item]);
        return false;
      }
      if (!reverseMap[stat] || typeof startData[item][stat] === 'function'){continue;}
      if (reverseMap[stat].name || stat === 'MIN' || stat === 'GP'){
        diff[item][stat] = endData[item][stat] - startData[item][stat];      
      }else if (reverseMap[stat].keep){
        diff[item][stat] = startData[item][stat];
      }
    }
  }
  return diff;
};

exports.makeDate = function(date,change){
  var changed = new Date(JSON.stringify(date));
  changed.setDate(date.getDate()-change);
  return changed;
};

exports.dateTimeless = function(date){
  var timlessDate;
  if (date){
    timelessDate = new Date(date);
  } else{
    timelessDate = new Date();
  }
  var timelessDate_utc = new Date(timelessDate.getUTCFullYear(), timelessDate.getUTCMonth(), timelessDate.getUTCDate());
  timelessDate_utc.setHours(0,0,0,0);
  return timelessDate_utc;
};
