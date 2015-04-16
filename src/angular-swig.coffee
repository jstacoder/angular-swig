'use strict'

app = angular.module 'angular.swig.app',['node.fs.app']

app.provider 'swig',[()->
    self = @

    self.cfg =
        autoescape : true
        varControls : ['{[',']}']
        tagControls : ['{%','%}']
        cmtControls : ['{#','#}']
        locals : {}
        cache : 'memory'

    rtn =
        $get :[ ()->
            s = require('swig')
            return new s.Swig self.cfg
        ]
        setAutoEscape : (choice)->
            self.cfg.autoescape = choice
        setVarControls : (array)->
            self.cfg.varControls = array
        setTagControls : (array)->
            self.cfg.tagControls = array
        setCmtControls : (array)->
            self.cfg.cmtControls = array
        setLocals : (locals)->
            self.cfg.locals = locals
        setCache : (arg)->
            self.cfg.cache = arg
        setLoader : (loader)->
            self.cfg.loader = loader
    return rtn
]

app.factory 'loadTemplate',['nodeFs','$q',(fs,$q)->
    def = $q.defer()

    return (filename,getBuffer)->
        fs.readFile filename,(err,res)->
            if err
                console.log "rejected by #{err}"
                def.reject err
            else
                if getBuffer
                    def.resolve res
                else
                    console.log "#{res.toString()}  loaded"
                    def.resolve res.toString()
            return
        return def.promise
]

app.factory 'render',['swig',(swig)->
    return (template,context)->
        return swig.render template,{locals:context}
]

app.factory 'writeOut',['nodeFs','$q',(fs,$q)->
    return (out,data)->
        def = $q.defer()
        fs.writeFile out,data,(err,res)->
            if err
                def.reject err
            else
                def.resolve res
        return def.promise
]

app.factory 'renderTemplate',['render','writeOut','loadTemplate',(render,writeOut,loadTemplate)->
    return (templateName,outfile,context)->
        console.log 'here?'
        loadTemplate(templateName).then (res)->
            writeOut(
                outfile,render(
                    res,context
                )
            ).then (res)->
                    if res
                        console.log "wrote file: #{outFile} from #{templateName}"
                return
            return
        return
]


