'use strict';

module.exports = function(System, app, auth, database) {

    var offices = require('../controllers/offices');

    // app.get('/api/offices', offices.all);
    app.post('/api/offices', auth.requiresAdmin, offices.create);
    app.get('/api/offices/:officeName', offices.get);
    // app.put('/api/offices/:name', auth.requiresAdmin, offices.update);
    // app.delete('/api/offices/:name', auth.requiresAdmin, offices.delete);
    app.param('officeName', offices.office);
};