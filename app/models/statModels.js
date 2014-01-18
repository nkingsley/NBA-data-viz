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
mongoose.model('Rawteams', new mongoose.Schema(schema,{collection: 'rawteams'}));
mongoose.model('Playernorm', new mongoose.Schema(schema,{collection: 'playernorms'}));
mongoose.model('Teamnorm', new mongoose.Schema(schema,{collection: 'teamnorms'}));
mongoose.model('Playerrank', new mongoose.Schema(schema,{collection: 'playerranks'}));
var tpSchema = {
  PLAYER_ID: Number,
  newId: Number,
  newTeam: String,
  created: {type:Date, default:Date.now}
};
mongoose.model('Tradedplayer', new mongoose.Schema(tpSchema,{collection: 'tradedplayers'}));