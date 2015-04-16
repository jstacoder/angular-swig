'use strict';

var app;

app = angular.module('angular.swig.app', ['node.fs.app']);

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

app.factory('loadTemplate', [
  'nodeFs', '$q', function(fs, $q) {
    var def;
    def = $q.defer();
    return function(filename, getBuffer) {
      fs.readFile(filename, function(err, res) {
        if (err) {
          console.log("rejected by " + err);
          def.reject(err);
        } else {
          if (getBuffer) {
            def.resolve(res);
          } else {
            console.log("" + (res.toString()) + "  loaded");
            def.resolve(res.toString());
          }
        }
      });
      return def.promise;
    };
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

app.factory('writeOut', [
  'nodeFs', '$q', function(fs, $q) {
    return function(out, data) {
      var def;
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

app.factory('renderTemplate', [
  'render', 'writeOut', 'loadTemplate', function(render, writeOut, loadTemplate) {
    return function(templateName, outfile, context) {
      console.log('here?');
      loadTemplate(templateName).then(function(res) {
        writeOut(outfile, render(res, context)).then(function(res) {
          if (res) {
            return console.log("wrote file: " + outFile + " from " + templateName);
          }
        });
        return;
      });
    };
  }
]);
