var handlebars = require('handlebars');
var fs = require('fs');
var Log = new require('./log.js');

Templates = function(templateName) {
	this.templateName = '';

	var sanitizeTemplateName =  function () {
		var name = '';
		name = templateName.replace(/^[\/]/g,'');
		return name;
	},
	init = function (templateName) {
		Log.info({code: '011', msg:'Templates Init', obj:templateName });
		this.templateName = templateName;
	};

	this.loadTemplate = function(path){
		Log.info({code:'012', msg:'Loading Template', obj:path});
		var tmpltName = sanitizeTemplateName(this.templateName);
		var template; 
		try {
			var files = fs.readdirSync(path);
			Log.info({code:'14', msg:'Files Founded', obj: files});
			
			for(var i = 0; i < files.length; i++) {
				if(files[i].search('.html') !== -1 && tmpltName === files[i]){
					Log.info({code:'15', msg:'File Founded',obj:''});
					template = fs.readFileSync(path+'/'+tmpltName, "utf8");
					Log.info({code:'16',msg:'Template Loaded',obj:''});
				}
			}
		} catch(e) {
			var exception = eval(e);
			var a = exception;
			Log.error({code: exception.errno, msg: (exception.code +'\u0020'+exception.syscall), obj:exception.path});
		}
		return template;
	};
	Log.info({code: '10', msg:'Template Object', obj:'' });
	init(templateName);
}

module.exports = Templates;