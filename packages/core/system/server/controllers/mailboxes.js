'use strict';

 var mongoose = require('mongoose'),
 Mailbox = mongoose.model('Mailbox'),
 _ = require('lodash');

/**
* Create a Mailbox
*/
 exports.create = function(req, res, next) {
    var mailbox = new Mailbox(req.body);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    mailbox.save(function(err) {
        if (err) {
            var modelErrors = [];
            switch (err.code) {
                case 11000:
                case 11001:
                res.status(400).json([{
                    msg: 'Mailbox code already in use',
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
* Load a Mailbox by code
*/
exports.mailbox = function(req, res, next, code) {
    if (!code) {
        res.status(400).json([{
            msg: 'Mailbox code required',
            param: 'code',
            value: code
        }]);
        return;
    }

    Mailbox.findOne({
        code: code
    }).exec(function(err, mailbox) {
        if (err) return next(err);
        if (!mailbox) mailbox = new Mailbox({ 'code': code });

        req.params.mailbox = mailbox;
        next();
    });
};

/**
* Get a Mailbox
*/
exports.get = function(req, res) {
    res.send(req.params.mailbox);
};
