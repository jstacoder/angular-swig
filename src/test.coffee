module.exports = ()->
    require './angular-swig.js'
    swig = ng_load 'render', ['angular.swig.app']

    console.log swig
    console.log swig '{[ x ]}',
        x : 5

    wo = ng_load 'writeTemplate'

    wo('tstfile.js',swig('{[ x ]}',{x : 5})).then(()->
        console.log 'ok'
    )

    
