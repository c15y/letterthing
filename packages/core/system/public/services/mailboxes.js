'use strict';

angular.module('mean.system').factory('Mailboxes', ['$resource',
  function($resource) {
    return $resource('/api/v1/mailboxes/:phone', null,
      {
          'update': { method: 'PUT' },
          'save': { method: 'POST', url: '/api/v1/mailboxes' }
      }
    );
  }
]);
