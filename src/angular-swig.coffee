'use strict'

app = angular.module 'angular.swig.app',[]

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

app.factory 'render',['swig',(swig)->
    return (template,context)->
        swig.render template,{locals:context}
]

app.factory 'writeTemplate',['$q',($q)->
    return (out,data)->
        fs = require('fs')
        def = $q.defer()
        fs.writeFile out,data,(err,res)->
            if err
                def.reject err
            else
                def.resolve res
        return def.promise
]


