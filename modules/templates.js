var handlebars = require('handlebars');
var fs = require('fs');
var log = require('./log.js');

var Templates = {
	loadTemplate : function (templateName,path){
		log('info',{code: 00, msg:'Load template Init', obj:'' });
		try {
			var files = fs.readdirSync(path);
			if(!files) {
				throw 'Nos files in directory';
			}
			log('info',{code:00, msg:'Files Load', obj:files});
			templateName = templateName.replace('.html','');
			templateName = templateName.replace('.xhtml','');
			templateName = templateName.replace('.htm','');
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
}
module.exports = Templates;