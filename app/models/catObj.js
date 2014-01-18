var mongoose = require('mongoose'),
    config = require('../../config/config'),
    map = require('../controllers/map').map,
    schema = {};
for (var stat in map){
  if (map[stat] && map[stat].name){
    schema[map[stat].name] = {weight:Number,cat:String};  
  }
}
schema.created = {
  type: Date,
  default: Date.now
};
schema.score = Number;
mongoose.model('Catobj', new mongoose.Schema(schema,{collection: 'catobj'}));
// setTimeout(function(){
//   var catobj = {};
// for (var stat in map){
//   if (map[stat] && map[stat].name){
//     catobj[map[stat].name] = {weight:5,cat:map[stat].cat};  
//   }
// }
// var Catobj = mongoose.model('Catobj')
// var catobj = new Catobj(catobj);
// catobj.save(function(err){
//   console.log(err);
// });
// },2000);