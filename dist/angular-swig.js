'use strict';

var app;

app = angular.module('angular.swig.app', []);

app.provider('swig', [
  function() {
    var rtn, self;
    self = this;
    self.cfg = {
      autoescape: true,
      varControls: ['{[', ']}'],
      tagControls: ['{%', '%}'],
      cmtControls: ['{#', '#}'],
      locals: {},
      cache: 'memory'
    };
    rtn = {
      $get: [
        function() {
          var s;
          s = require('swig');
          return new s.Swig(self.cfg);
        }
      ],
      setAutoEscape: function(choice) {
        return self.cfg.autoescape = choice;
      },
      setVarControls: function(array) {
        return self.cfg.varControls = array;
      },
      setTagControls: function(array) {
        return self.cfg.tagControls = array;
      },
      setCmtControls: function(array) {
        return self.cfg.cmtControls = array;
      },
      setLocals: function(locals) {
        return self.cfg.locals = locals;
      },
      setCache: function(arg) {
        return self.cfg.cache = arg;
      },
      setLoader: function(loader) {
        return self.cfg.loader = loader;
      }
    };
    return rtn;
  }
]);

app.factory('render', [
  'swig', function(swig) {
    return function(template, context) {
      return swig.render(template, {
        locals: context
      });
    };
  }
]);

app.factory('writeTemplate', [
  '$q', function($q) {
    return function(out, data) {
      var def, fs;
      fs = require('fs');
      def = $q.defer();
      fs.writeFile(out, data, function(err, res) {
        if (err) {
          return def.reject(err);
        } else {
          return def.resolve(res);
        }
      });
      return def.promise;
    };
  }
]);
