module.exports = function() {
  var isDir, listDir, loadTemplate, renderTemplate, swig, wo;
  require('./angular-swig.js');
  require('angular-node-fs');
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
  listDir = ng_load('listDir', ['node.fs.app']);
  isDir = ng_load('isDir');
  isDir('package.json').then(function(res) {
    return console.log("package.json result->", res);
  });
  listDir('src').then(function(res) {
    var lst;
    console.log(res);
    lst = angular.copy(res);
    angular.forEach(lst, function(itm) {
      console.log(itm);
      isDir(itm).then(function(res) {
        var msg;
        if (res) {
          msg = "" + itm + " is a dir";
        } else {
          msg = "" + itm + " is not a dir";
        }
        console.log(msg);
      });
    });
  });
  loadTemplate('newtst.txt').then(function(res) {
    console.log(res);
  });
};
