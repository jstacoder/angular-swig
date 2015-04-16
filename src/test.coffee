module.exports = ()->
    require './angular-swig.js'
    require 'angular-node-fs'
    swig = ng_load 'render', ['angular.swig.app']

    console.log swig
    console.log swig '{[ x ]}',
        x : 5

    wo = ng_load 'writeOut'

    wo('tstfile.js',swig('{[ x ]}',{x : 5})).then(()->
        console.log 'ok'
        return
    )

    renderTemplate = ng_load 'renderTemplate'

    renderTemplate 'testTemplate.tpl','newtst.txt',{tstVar:'were good'}
    
    loadTemplate = ng_load 'loadTemplate'

    loadTemplate('testTemplate.tpl').then (res)->
        console.log res
        return

    listDir = ng_load 'listDir',['node.fs.app']
    isDir = ng_load 'isDir'

    isDir('package.json').then (res)->
        console.log "package.json result->",res

    listDir('src').then (res)->
        console.log res
        lst = angular.copy res

        angular.forEach lst,(itm)->
            console.log itm

            isDir(itm).then (res)->
                if res
                    msg = "#{itm} is a dir"
                else
                    msg = "#{itm} is not a dir"
                console.log msg
                return
            return
        return

    loadTemplate('newtst.txt').then (res)->
        console.log res
        return
    return


    
