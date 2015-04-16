module.exports = function() {
  var swig, wo;
  require('./angular-swig.js');
  swig = ng_load('render', ['angular.swig.app']);
  console.log(swig);
  console.log(swig('{[ x ]}', {
    x: 5
  }));
  wo = ng_load('writeTemplate');
  return wo('tstfile.js', swig('{[ x ]}', {
    x: 5
  })).then(function() {
    return console.log('ok');
  });
};
