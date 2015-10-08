'use strict';

module.exports = function(System, app, auth, database) {

    var offices = require('../controllers/offices');

    app.param('officeId', offices.load);

    app.get('/api/offices', offices.all);
    app.post('/api/offices', auth.requiresAdmin, offices.create);
    // app.put('/api/offices/:officeId', auth.requiresAdmin, offices.update);
    // app.delete('/api/offices/:officeId', auth.requiresAdmin, offices.delete);
};