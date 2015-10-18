'use strict';

var mongoose = require('mongoose'),
Page = mongoose.model('Page'),
restify = require('express-restify-mongoose');

module.exports = function(System, app, auth, database) {
  restify.serve(app, Page);
};
