exports.toArray = function(obj){
  var array = [];
  for (var key in obj){
    obj[key].tempName = key;
    array.push(obj[key]);
  }
  return array;
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
      if (!endData[item][stat]){
        console.log(startData[item][stat]);
        return false;
      }
      diff[item][stat] = endData[item][stat] - startData[item][stat];
    }
  }
  return diff;
};

exports.makeDate = function(date,change){
  var changed = new Date(date);
  changed.setDate(dateStart.getDate()-change);
  return changed;
};

