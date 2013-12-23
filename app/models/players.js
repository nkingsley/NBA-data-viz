var mongoose = require('mongoose'),
    config = require('../../config/config');
    fs = require('fs');
    var headerline = fs.readFileSync('./grandnbafile.csv') + '';
    headerline = headerline.split('\n')[0].split(',');
    var schema = {}, type;
    for (var i = 0 ; i < headerline.length; i++){
      if (headerline[i] === "Player" ||headerline[i] === "Team" || headerline[i] === "Position"){
            type = String;
      } else{
            type = Number;
      }
      schema[headerline[i]] = type;
    }
    console.log(schema);
mongoose.model('Player', new mongoose.Schema(schema,{collection: 'players'}));