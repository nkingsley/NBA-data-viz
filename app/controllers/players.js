var mongoose = require('mongoose'),
    Player = mongoose.model('Player'),
    _ = require('lodash');

exports.show = function(req,res){
  mongoose.model('Player').find({Player: new RegExp('^'+req.params.name+'$', "i")},function(err,data){
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

exports.all = function(req,res){
  mongoose.model('Player').find(function(err,data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};