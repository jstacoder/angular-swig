module.exports = ()->
    require './angular-swig.js'
    swig = ng_load 'render', ['angular.swig.app']

    console.log swig
    console.log swig '{[ x ]}',
        x : 5

    wo = ng_load 'writeOut'

    wo('tstfile.js',swig('{[ x ]}',{x : 5})).then(()->
        console.log 'ok'
    )

    renderTemplate = ng_load 'renderTemplate'

    renderTemplate 'tstTemplate.tpl','newtst.txt',{tstVar:'were good'}
    
    loadTemplate = ng_load 'loadTemplate'

    loadTemplate('testTemplate.tpl').then (res)->
        console.log res


    
