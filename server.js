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
var templates = require('./modules/templates.js');
var log = require('./modules/log.js');

var main = function(req, res) {
	log('info', {code:'01',msg:'Server requested',obj:''});
	var urlData = url.parse(req.url);
	var extension = urlData.pathname.split(/[.]/g);
	switch(extension[1]){
		case 'ico':
	    	res.writeHead(200, {'Content-Type': 'image/x-icon'});
			break;
		case 'html':
			log('info', {code: 02, msg:'Request template',obj:''});
			var tpl = new Templates();
			console.log(tpl);
			// templates.init(urlData.path);
			// var template = templates.loadTemplate('./Templates');
			res.writeHead(200, {"Context-Type": "text/html"});
			res.write('oi');
			break;
		case 'api':
			var searchParams = querystring.parse(urlData.query);
			searchParams.item = encodeURI(searchParams.item);
			if (searchParams.holmes === true) {
				
			} else {
				
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			var requestIs = '';
			res.write(JSON.stringify(processedData));
			break;
		case 'png':
			break;
	}
	res.end();
};

http.createServer(main).listen(8080,'localhost');
log('log',{code: '01', msg: 'Server Started on port 8080', obj:''});