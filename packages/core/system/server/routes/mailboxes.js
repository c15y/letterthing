'use strict';

module.exports = function(System, app, auth, database) {
    var mailboxes = require('../controllers/mailboxes');

    app.param('code', mailboxes.mailbox);

    // app.get('/api/mailboxes', mailboxes.all);
    app.post('/api/mailboxes', auth.requiresAdmin, mailboxes.create);

    app.get('/api/mailboxes/:code', mailboxes.get);
    //app.get('/api/mailboxes/:code', mailboxes.get);

    // app.put('/api/mailboxes/:code', auth.requiresAdmin, mailboxes.update);
    // app.delete('/api/mailboxes/:code', auth.requiresAdmin, mailboxes.delete);
};