'use strict';

 var mongoose = require('mongoose'),
 MailStop = mongoose.model('MailStop'),
 _ = require('lodash');

/**
* Create a MailStop
*/
 exports.create = function(req, res, next) {
    var mailStop = new MailStop(req.body);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    mailStop.save(function(err) {
        if (err) {
            var modelErrors = [];
            switch (err.code) {
                case 11000:
                case 11001:
                res.status(400).json([{
                    msg: 'MailStop code already in use',
                    param: 'code'
                }]);
                break;
                default:
                if (err.errors) {
                    for (var x in err.errors) {
                        modelErrors.push({
                            param: x,
                            msg: err.errors[x].message,
                            value: err.errors[x].value
                        });
                    }

                    res.status(400).json(modelErrors);
                }
            }
            return res.status(400);
        }

        res.status(200);
    });
};

/**
* Load a MailStop by code
*/
exports.mailStop = function(req, res, next, code) {
    if (!code || !code.toString().match("^[0-9]{10}$")) {
        res.status(400).json([{
            msg: 'Invalid MailStop code (must be a 10-digit number)',
            param: 'code'
        }]);
        return;
    }

    MailStop.findOne({
        code: code
    }).exec(function(err, mailStop) {
        if (err) return next(err);
        if (!mailStop) mailStop = new MailStop({ 'code': code });

        req.params.mailStop = mailStop;
        next();
    });
};

/**
* Get a MailStop
*/
exports.get = function(req, res) {
    res.send(req.params.mailStop);
};
