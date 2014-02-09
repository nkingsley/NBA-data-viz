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
  for (var item in collection){
    for (var stat in collection[item]){
      var name = reverseMap[stat].key;
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
  for (var item in endData){
    diff[item] = diff[item] || {};
    for (var stat in endData[item]){
      if (!reverseMap[stat] || typeof endData[item][stat] === 'function' || !startData[item]){continue;}
      if (reverseMap[stat].name || stat === 'MIN' || stat === 'GP'){
        diff[item][stat] = endData[item][stat] - startData[item][stat];   
        if (diff[item][stat] < 0){
          console.log('effed up here->',item,'new->',endData[item],'old->',startData[item],'diff->',diff[item]);
        } 
      }else if (reverseMap[stat].keep){
        diff[item][stat] = startData[item][stat];
      }
    }
  }
  return diff;
};

exports.makeDate = function(date,change){
  var changed = new Date(date);
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
