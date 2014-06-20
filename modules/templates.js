
function Templates () {
	this.loadTemplates = function(templateName) {
		var files = fs.readdirSync('./templates');
		var template = '';
		for(var i = 0; i < files.length; i++) {
			if(files[i].search('.html') !== -1){
				template = fs.readFileSync('./'+templateName+'.html', "utf8");
			}
		}
		return files;
	}
}

var templates = new Templates();
module.exports = templates;