var mongoose = require('mongoose'),
    map = require('../controllers/map').map,
    utils = require('../controllers/utils');
    schema = {};
for (var stat in map){
  if (map[stat] && map[stat].name){
    schema[map[stat].name] = {weight:Number,cat:String,team:Boolean};  
  }
}
schema.created = {
  type: Date,
  default: Date.now
};
schema.score = Number;
mongoose.model('Catobj', new mongoose.Schema(schema,{collection: 'catobj'}));

// //uncomment to populate a default catObj into the db
// setTimeout(function(){
//   var catobj = {};
// for (var stat in map){
//   if (map[stat] && map[stat].name){
//     catobj[map[stat].name] = {weight:5,cat:map[stat].cat}; 
//     if (map[stat].team){
//       catobj[map[stat].name] = {weight:5,cat:'TM_DEF'}; 
//     }
//   }
// }
// catobj.score = 0.5;
// catobj.created = utils.dateTimeless();
// var Catobj = mongoose.model('Catobj')
// var catobj = new Catobj(catobj);
// catobj.save(function(err){
//   console.log(err);
// });
// },2000);