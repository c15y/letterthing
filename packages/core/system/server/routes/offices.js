'use strict';

module.exports = function(System, app, auth, database) {

    var offices = require('../controllers/offices');

    // app.get('/api/offices', auth.requiresAdmin, offices.all);
    app.post('/api/offices', auth.requiresAdmin, offices.create);
    app.get('/api/offices/:name', auth.requiresAdmin, offices.get);
    // app.put('/api/offices/:name', auth.requiresAdmin, offices.update);
    // app.delete('/api/offices/:name', auth.requiresAdmin, offices.delete);
};