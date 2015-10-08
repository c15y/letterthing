'use strict';

module.exports = function(System, app, auth, database) {

    var offices = require('../controllers/offices');

    app.param('officeName', offices.office);

    // app.get('/api/offices', offices.all);
    app.post('/api/offices', auth.requiresAdmin, offices.create);
    app.get('/api/offices/:officeName', offices.get);
    // app.put('/api/offices/:officeName', auth.requiresAdmin, offices.update);
    // app.delete('/api/offices/:officeName', auth.requiresAdmin, offices.delete);
};