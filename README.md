##_Angular-Swig_
###whats included:

*   swig - service that provides access to Swig object
*   render - factory that takes a template as a string, and context as an object and returns the rendered string
*   writeOut - factory that given a filename and data will write it to the system
*   renderTemplate - factory that combines render and writeOut, to write a rendered template to the filesystem
*   loadTemplate - factory that asyncronysly loads content from files for use in the render service
*   swigProvider - provider to allow changing swigOptions

to use just add angular.swig.app as a dependency:

```coffeescript
app = angular.module 'my.cool.app',['angular.swig.app']

app.controller 'MyCtrl',['renderTemplate',class MyCtrl
    constructor:(@renderTemplate)->    
]
```

