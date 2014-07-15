var handlebars = require('handlebars');
var fs = require('fs');
var log = require('./log.js');

var Templates = function() {
	this.templateName = '';

	this.init = function (templateName) {
		this.templateName = templateName;
		log('info',{code: 00, msg:'Templates Called', obj:{'Template Name':templateName} });
	},

	this.sanitizeTemplateName =  function () {
		var name = '';
		name = templateName.replace(/^[\/]/g,'');
		name = templateName.replace('.html','');
		name = templateName.replace('.xhtml','');
		name = templateName.replace('.htm','');
		return new String(name);
	},

	this.loadTemplate = function(path){
		var tmpltName = sanitizeTemplateName(this.templateName);
		console.log(tmpltName);
		try {
			var files = fs.readdirSync(path);
			if(!files) {
				log('warn', { code: 01, msg: 'Files not Found', obj:''});
				throw 'Nos files in directory';
			}
			log('info',{code:00, msg:'Files Load', obj:files});

			for(var i = 0; i < files.length; i++) {
				if(files[i].search('.html') !== -1){
					template = fs.readFileSync('./'+templateName, "utf8");
				}
			}
		} catch(e) {
			log('error', {code: 01, msg:'Template not found',obj:e});
		}
		return files;
	}
	return {
		init : this.init,
		loadTemplate: this.loadTemplate
	}
}
exports.templates = Templates;