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
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
//var aws = require('aws-lib');
var handlebars = require('handlebars');
var Q = require('Q');
var templates = require('./modules/templates');

var cluster = require('cluster');
var os = require('os');

var locations = {
	default:{
		port:'8080',
		name:'localhost'
	},
	icon: {
		port:'8085',
		name:'localhost'
	},
	html: {
		port:'8000',
		name:'localhost'
	}
};

function iconServer() {
	console.log("Other server");
};

var main = function(req, res) {
	
	var urlData = url.parse(req.url);
	console.log("Call to URL :"+ urlData.pathname);
	if (req.method.toUpperCase() === "GET" && urlData.pathname === "/api") {
		var searchParams = querystring.parse(urlData.query);
		searchParams.item = encodeURI(searchParams.item);
		if (searchParams.holmes === true) {
			console.log('Load Holmes functions');
		} else {
			console.log('Load search modules');
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		var requestIs = '';
		res.write(JSON.stringify(processedData));
	} else if(urlData.pathname.search(".html") === -1) {
		console.log('Call templates');
		var templateName = urlData.pathname.replace(".html");
		console.log(templates,'\n'+templateName);
		/*var pageBuilder = handlebars.compile(template);
		var pageText = pageBuilder(source);*/
		res.writeHead(200, {"Context-Type": "text/html"});
		res.write('pageText');
		res.end();
	} else if(urlData.pathname.search(".ico") === -1) {
		console.log("É icone");
		console.log("Server has started on port 8085");
	}
	processedData = {'teste':'teste'};
	
	res.end();
}

if (cluster.isMaster) {
	var cpus = os.cpus().length;
	for (var i = 0; i <= cpus; i++) {
		cluster.fork();
	}
	cluster.on('listening', function(worker) {
		console.log('Cluster %d esta conectado.', worker.process.pid);
	});
	cluster.on('disconnect', function(worker) {
		console.log('Cluster %d esta desconectado.', worker.process.pid);
	});
	cluster.on('exit', function(worker) {
		console.log('Cluster %d caiu fora.', worker.process.pid);
	});
} else {
	var server = http.createServer(main);
	switch(requestIs) {
		case 'html':
			server.listen(locations.html.port,locations.html.name);
			console.log('Server has started on port '+locations.html.port);
			break;
		case 'icon':
			server.listen(locations.icon.port,locations.icon.name);
			console.log('Server has started on port '+locations.icon.port);
			break;
		default:
			server.listen(locations.default.port,locations.default.name);
			console.log('Server has started on port '+locations.default.port);
			break;
	}
	console.log("Server has started on port 8000.");
}