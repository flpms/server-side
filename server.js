/* * * * * * * * * * * * * * *
* Author: Filipe M. Silva
* Date: 15/06/2014
* Version: 0.0.2
* About: Init Configs
* ChangeList: Code Division, Modules Creation, Work with Promisses.
* * * * * * * * * * * * * * */
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var Q = require('Q');
var Templates = require('./modules/templates.js');
var handlebars = require('handlebars');
var Log = new require('./modules/log.js');
var main = function(req, res) {
	Log.log({code:'001',msg:'-* Server requested *-',obj:''});
	var urlData = url.parse(req.url);
	var extension = urlData.pathname.split(/[.]/g);
	switch(extension[1]){
		case 'api':
			Log.info({code: '002', msg:'Request API',obj:''});
			var searchParams = querystring.parse(urlData.query);
			searchParams.item = encodeURI(searchParams.item);
			if (searchParams.holmes === true) {
				
			} else {
				
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			var requestIs = '';
			res.write(JSON.stringify(processedData));
			break;
		case 'html':
			Log.info({code: '003', msg:'Request template html',obj:''});
			var template = new Templates(urlData.path);
			var templateLoaded = template.loadTemplate('./Templates');
			var compiler = handlebars.compile(templateLoaded);
			var templateCompiled = compiler({siteTitle:"Holmes"});
			res.writeHead(200, {"Context-Type": "text/html"});
			res.write(''+templateCompiled);
			Log.info({code:'010', msg:'Write template ', obj:'' });
			break;
		case 'png':
			Log.info({code: '004', msg:'Request template html',obj:''});
			break;
		case 'ico':
			Log.info({code: '002', msg:'Request favico',obj:''});
	    	res.writeHead(200, {'Content-Type': 'image/x-icon'});
			break;
	}
	Log.info({code: '005', msg:'-* End Request *-', obj:''});
	res.end();
};

http.createServer(main).listen(8080,'localhost');
Log.log({code: '000', msg: 'Started on port 8080', obj:''});