exports.test = function(req,res){
  var getStats = require('./getStats');
  setTimeout(function(){
    res.end(JSON.stringify(getStats.stats));
  },5000);
}