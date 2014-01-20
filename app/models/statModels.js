var mongoose = require('mongoose'),
  map = require('../controllers/map').map;

var makeSchema = function(map){
  var schema = {}, type,name;
  for (var stat in map){
    if (stat === "PLAYER" || stat === "TEAM_ABBREVIATION"){
      type = String;
    } else{
      type = Number;
    }
    name = map[stat].name || map[stat].keep;
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

var schema = makeSchema(map);

mongoose.model('Rawstat', new mongoose.Schema(schema,{collection: 'rawstats'}));
mongoose.model('Rawteam', new mongoose.Schema(schema,{collection: 'rawteams'}));
mongoose.model('Teamnorm', new mongoose.Schema(schema,{collection: 'teamnorms'}));
var playerSchema = {};

for (var stat in schema){
  playerSchema[stat] = schema[stat];
  if (schema[stat] === Number){
    playerSchema[stat + '_rank'] = Number;
  }
}

mongoose.model('Playernorm', new mongoose.Schema(playerSchema,{collection: 'playernorms'}));

var tpSchema = {
  PLAYER_ID: Number,
  newId: Number,
  newTeam: String,
  created: Date
};
mongoose.model('Tradedplayer', new mongoose.Schema(tpSchema,{collection: 'tradedplayers'}));
var winLossSchema = {
  Team: String,
  Wins: Number,
  Losses: Number,
  created: Date
}
mongoose.model('Winloss', new mongoose.Schema(winLossSchema,{collection: 'winslosses'}));
