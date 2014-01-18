var mongoose = require('mongoose'),
    config = require('../../config/config'),
    map = require('../controllers/map').map,
    sm = require('../controllers/schemaMaker');
var schema = sm.makeScheme(map);
mongoose.model('Rawstat', new mongoose.Schema(schema,{collection: 'rawstats'}));