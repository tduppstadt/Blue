------------------------------------------------------------
Templates

HTML templates are placed here using doT syntax.
Content\templates
Each time they are edited the build script must be run because the program uses the compiled js version. This is located here:
Content\js\project\templates\templates-concat.js

Then in the code you can access it by including that JS file and window.oTemplates will contain all of the templates. 

