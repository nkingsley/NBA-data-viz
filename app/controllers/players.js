var mongoose = require('mongoose'),
    Player = mongoose.model('Player'),
    _ = require('lodash');
exports.show = function(req,res){
  Player.find({Player: new RegExp('^'+req.params.name+'$', "i")},function(err,data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};

exports.team = function(req,res){
  mongoose.model('Player').find({Team: new RegExp('^'+req.params.team+'$', "i")},function(err,data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};

exports.teams = function(req,res){
  var getStats = require('./getStats');
  setTimeout(function(){
    console.log(getStats);
    res.end(JSON.stringify(getStats.stats));
  },5000);
};

exports.all = function(req,res){
  mongoose.model('Player').find(function(err,data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};