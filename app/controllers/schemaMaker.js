exports.makeScheme = function(map){
  var schema = {}, type;
  for (var stat in map){
    var name = false;
    if (stat === "PLAYER" || stat === "TEAM_ABBREVIATION" || stat === "PLAYER_ID"){
      type = String;
      switch (stat){
        case "PLAYER":
        name = "Player";
        break;
        case "TEAM_ABBREVIATION":
        name = "Team";
        break;
      }
    } else{
      type = Number;
    }
    var name = name || map[stat].name;
    if (name){
      schema[name] = type;
    }
  }
  schema.created = {
    type: Date,
    default: Date.now
  };
  return schema;
};