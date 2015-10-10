'use strict';

angular.module('flow').config(['flowFactoryProvider',
  function(flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: '/api/letters',
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
  }
]);