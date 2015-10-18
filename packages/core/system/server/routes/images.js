'use strict';

 var mean = require('meanio'),
multipart = require('connect-multiparty'),
       fs = require('fs'),
 mongoose = require('mongoose'),
     Page = mongoose.model('Page'),
       s3 = require('s3'),
   config = mean.loadConfig();

var multipartMiddleware = multipart();

var s3Client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
});

module.exports = function(System, app, auth, database) {
  app.post('/api/v1/images/:letter/:page', multipartMiddleware, function(req, res, next) {
    var letter = req.params.letter;
    var page = req.params.page;
    var file = req.files.file.path;

    var params = {
      localFile: file,
      s3Params: {
        Bucket: config.s3Bucket,
        Key: page
      }
    };

    var uploader = s3Client.uploadFile(params);

    uploader.on('error', function(err) {
      fs.unlink(file);
      next(err);
    });

    uploader.on('end', function(data) {
      fs.unlink(file);
      var newPage = new Page({ _id: page, letter: letter });
      newPage.save(function(err) {
        if (err) {
          next(err);
        }
        else {
          res.status(200).send();
        }
      });
    });
  })
};

/*
  var params = {
    s3Params: {
      Bucket: config.s3Bucket,
      Key: this._id.toString()
    }
  };

  var downloader = client.downloadBuffer(params);
  downloader.on('end', function(buffer) {
    // ...
  });

*/
