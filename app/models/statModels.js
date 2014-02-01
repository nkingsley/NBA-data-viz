var mongoose = require('mongoose'),
  maps = require('../controllers/map');
var map = maps.map;
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

mongoose.model('Teamnorm', new mongoose.Schema(schema,{collection: 'teamnorms'}));
mongoose.model('Tnmovavg', new mongoose.Schema(schema,{collection: 'tnmovavgs'}));
schema.Position = String;
schema.Birthdate = String;
mongoose.model('Rawmovavg', new mongoose.Schema(schema,{collection: 'Rawmovavgs'}));
mongoose.model('Rawstat', new mongoose.Schema(schema,{collection: 'rawstats'}));
var playersSchema = {};
for (var stat in schema){
  var rmap = maps.reverseMap();
  if(!rmap[stat]){
    playersSchema[stat] = schema[stat];
    continue;
  }
  if(rmap[stat].team || rmap[stat].cat === "PSS_TM" || rmap[stat].cat === "SHT_TM"){
    continue;
  }
  playersSchema[stat] = schema[stat];
}
mongoose.model('Playernorm', new mongoose.Schema(playersSchema,{collection: 'playernorms'}));
mongoose.model('Pnmovavg', new mongoose.Schema(playersSchema,{collection: 'Pnmovavgs'}));

var tpSchema = {
  PLAYER_ID: Number,
  newId: Number,
  newTeam: String,
  created: Date
};
mongoose.model('Tradedplayer', new mongoose.Schema(tpSchema,{collection: 'tradedplayers'}));
var winLossSchema = {
  teams: [{
    franchise: String,
    winPct: Number,
  }],
  created: Date
};
mongoose.model('Winloss', new mongoose.Schema(winLossSchema,{collection: 'winslosses'}));

var playerDetailSchema = {
  players:[{
    PERSON_ID: Number,
    POSITION: String,
    BIRTHDATE: String 
  }],
  created: Date
};

mongoose.model('Playerdetail', new mongoose.Schema(playerDetailSchema,{collection:'playerdetails'}));
