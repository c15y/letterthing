'use strict';

var mongoose  = require('mongoose'),
     Schema   = mongoose.Schema,
           s3 = require('s3');

var ImageSchema = new Schema({
  key: { type: String, required: true }
});

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

ImageSchema.virtual('buffer').get(function (cb) {
  var params = {
    s3Params: {
      Bucket: s3Bucket,
      Key: this.key
    }
  };

  var downloader = s3.downloadBuffer(params);
  downloader.on('end', function(buffer) {
    cb(buffer);
  });
});

ImageSchema.virtual('file').set(function (file, cb) {
  var params = {
    localFile: file,
    s3Params: {
      Bucket: s3Bucket,
      Key: this.key
    }
  };

  var uploader = s3.uploadFile(params);
  uploader.on('end', function(data) {
    cb(data);
  });
});

exports.Image = mongoose.model('Image', ImageSchema);