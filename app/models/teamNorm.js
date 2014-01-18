var mongoose = require('mongoose'),
    config = require('../../config/config'),
    map = require('../controllers/map').map,
    sm = require('../controllers/schemaMaker');
var schema = sm.makeScheme(map);
mongoose.model('Teamnorm', new mongoose.Schema(schema,{collection: 'teamnorms'}));