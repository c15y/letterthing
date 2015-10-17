'use strict';

var mongoose = require('mongoose'),
     Mailbox = mongoose.model('Mailbox'),
     Letter = mongoose.model('Letter'),
           _ = require('lodash'),
     restify = require('express-restify-mongoose');

module.exports = function(System, app, auth, database) {
    var mailboxes = require('../controllers/mailboxes');

    restify.serve(app, Mailbox);

    restify.serve(app, Letter);
};
