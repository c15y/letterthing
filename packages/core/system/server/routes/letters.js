'use strict';

var mongoose = require('mongoose'),
Letter = mongoose.model('Letter'),
restify = require('express-restify-mongoose');

module.exports = function(System, app, auth, database) {
  restify.serve(app, Letter);
};
