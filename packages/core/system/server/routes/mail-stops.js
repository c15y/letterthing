'use strict';

var Grid = require('gridfs-stream');

module.exports = function(System, app, auth, database) {
    var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);

    var mailStops = require('../controllers/mail-stops');

    // app.get('/api/mailStops', auth.requiresAdmin, mailStops.all);
    app.post('/api/mailStops', auth.requiresAdmin, mailStops.create);
    app.get('/api/mailStops/:code', auth.requiresAdmin, mailStops.get);
    // app.put('/api/mailStops/:code', auth.requiresAdmin, mailStops.update);
    // app.delete('/api/mailStops/:code', auth.requiresAdmin, mailStops.delete);
};