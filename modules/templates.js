var handlebars = require('handlebars');
var fs = require('fs');
var Log = new require('./log.js');

Templates = function(templateName) {
	this.templateName = '';

	var sanitizeTemplateName =  function () {
		var name = '';
		name = templateName.replace(/^[\/]/g,'');
		name = templateName.replace('.html','');
		name = templateName.replace('.xhtml','');
		name = templateName.replace('.htm','');
		return new String(name);
	},
	init = function (templateName) {
		Log.info({code: '011', msg:'Templates Init', obj:templateName });
		this.templateName = templateName;
	}; 

	this.loadTemplate = function(path){
		Log.info({code:'012', msg:'Loading Template', obj:path});
		var tmpltName = sanitizeTemplateName(this.templateName);
		try {
			var files = fs.readdirSync(path);
			if(!files) {
				throw 'No files in directory';
			}
			Log.info({code:'14', msg:'Files Founded', obj:files});
			
			for(var i = 0; i < files.length; i++) {
				if(files[i].search('.html') !== -1){
					template = fs.readFileSync('./'+templateName, "utf8");
				}
			}
		} catch(e) {
			var exception = eval(e);
			if(typeof exception.errno === undefined) {
				Log.error({code: '013', msg:'Template not found',obj:exception});
			} else {
				var a = exception;
				Log.error({code: exception.errno, msg: (exception.code +'\u0020'+exception.syscall), obj:exception.path});
			}
		}
		return files;
	};
	Log.info({code: '10', msg: 'Template Object', obj:'' });
	init(templateName);
}

module.exports = Templates;