angular.module('MoneyBaller').factory("Coupling", ["Global", function (Global) {
  var exports = {};
  exports.changeCoupled = function(statName,group){
    if (!group[statName].coupledName){
      return;
    }
    for (var stat in group){
      if (stat === statName){
        continue;
      }
      if (group[stat].coupledName === group[statName].coupledName){
        group[stat].weight = group[statName].weight;
      }
    }
  };
  exports.coupleStats = function(group){
    var result = {};
    var coupledStats = {};
    for (var stat in group){
      if (!exports.filterTeamOnlySliders(group[stat]) && stat !== "Team Defense"){continue;}
      if (coupledStats[group[stat].coupledName] || stat === "main" || stat === "oldMain"){
        continue;
      }
      if (group[stat].coupledName){
        coupledStats[group[stat].coupledName] = true;
      }
      result[stat]= group[stat];
    }
    return result;
  };

  exports.filterTeamOnlySliders = function(stat){
    if (!(stat.weight > -1)){return false;}
    if (Global.currentTeam === 'ALL'){
      if (stat.cat === "PSS_TM" || stat.cat === "SHT_TM"){
        return false;
      }
    }
    return true;
  };
return exports;
  }]);