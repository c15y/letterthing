'use strict';

var mongoose = require('mongoose'),
Mailbox = mongoose.model('Mailbox'),
restify = require('express-restify-mongoose');

module.exports = function(System, app, auth, database) {
  restify.serve(app, Mailbox, {
    idProperty: 'msc'
  });
};
