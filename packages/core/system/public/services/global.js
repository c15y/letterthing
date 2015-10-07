'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', [

  function() {
    var _this = this;
    _this._data = {
      user: window.user,
      authenticated: false,
      isAdmin: false,
      isManager: false,
      isOperator: false
    };
    if (window.user && window.user.roles) {
      _this._data.authenticated = window.user.roles.length;
      _this._data.isAdmin = window.user.roles.indexOf('admin') !== -1;
      _this._data.isManager = _this._data.isAdmin || window.user.roles.indexOf('manager') !== -1;
      _this._data.isOperator = _this._data.isManager || window.user.roles.indexOf('operator') !== -1;
    }
    return _this._data;
  }
]);
