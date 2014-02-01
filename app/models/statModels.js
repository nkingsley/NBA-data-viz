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

mongoose.model('Teamnorm', new mongoose.Schema(schema,{collection: 'teamnorms'}));
mongoose.model('Tnmovavg', new mongoose.Schema(schema,{collection: 'tnmovavgs'}));
schema.Position = String;
schema.Birthdate = String;
mongoose.model('Rawmovavg', new mongoose.Schema(schema,{collection: 'Rawmovavgs'}));
mongoose.model('Rawstat', new mongoose.Schema(schema,{collection: 'rawstats'}));
mongoose.model('Playernorm', new mongoose.Schema(schema,{collection: 'playernorms'}));
mongoose.model('Pnmovavg', new mongoose.Schema(schema,{collection: 'Pnmovavgs'}));

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
