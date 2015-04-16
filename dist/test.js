module.exports = function() {
  var loadTemplate, renderTemplate, swig, wo;
  require('./angular-swig.js');
  swig = ng_load('render', ['angular.swig.app']);
  console.log(swig);
  console.log(swig('{[ x ]}', {
    x: 5
  }));
  wo = ng_load('writeOut');
  wo('tstfile.js', swig('{[ x ]}', {
    x: 5
  })).then(function() {
    console.log('ok');
  });
  renderTemplate = ng_load('renderTemplate');
  renderTemplate('testTemplate.tpl', 'newtst.txt', {
    tstVar: 'were good'
  });
  loadTemplate = ng_load('loadTemplate');
  loadTemplate('testTemplate.tpl').then(function(res) {
    console.log(res);
  });
};
