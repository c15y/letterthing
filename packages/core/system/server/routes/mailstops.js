'use strict';

var Grid = require('gridfs-stream');

module.exports = function(System, app, auth, database) {
    var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);

    var mailStops = require('../controllers/mailstops');

    app.param('msc', mailStops.mailStop);

    // app.get('/api/mailStops', mailStops.all);
    app.post('/api/mailStops', auth.requiresAdmin, mailStops.create);

    app.get('/api/mailStops/:msc', mailStops.get);
    //app.get('/api/mailStops/:msc', mailStops.get);

    // app.put('/api/mailStops/:msc', auth.requiresAdmin, mailStops.update);
    // app.delete('/api/mailStops/:msc', auth.requiresAdmin, mailStops.delete);
};