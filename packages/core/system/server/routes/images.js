'use strict';

var mongoose = require('mongoose'),
Image = mongoose.model('Image'),
restify = require('express-restify-mongoose');

module.exports = function(System, app, auth, database) {
  restify.serve(app, Image);
};
