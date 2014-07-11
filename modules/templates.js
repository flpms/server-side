var handlebars = require('handlebars');
var fs = require('fs');
var Templates = {
	loadTemplates : function (templateName){
		var files = fs.readdirSync('./templates');
		var template = '';
		console.log(templatesName);
		for(var i = 0; i < files.length; i++) {
			if(files[i].search('.html') !== -1){
				template = fs.readFileSync('./'+templateName, "utf8");
			}
		}
		return files;
	}
}
module.exports = Templates;