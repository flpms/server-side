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
//var templates = require('WebContent/');
var cluster = require('cluster');
var os = require('os');

var locations = {
	name: 'localhost',
	default:{
		port:1337,
		actived:true
	},
	icon: {
		port:8085,
		actived:false
	},
	html: {
		port:8080,
		actived:false
	},
	api: {
		port:8000,
		actived:false
	},
	images: {
		port:8081,
		actived:false
	}
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
		//var templateName = urlData.pathname.replace(".html");
		//console.log(templates,'\n'+templateName);
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

var icon = function(req, res) {
	if (req.url === '/favicon.ico') {
	    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
	    res.end();
	    console.log('favicon requested');
	    return;
	}
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
	if (!locations.html.actived) {
		var server = http.createServer(main);
		server.listen(locations.html.port,locations.name);
		locations.html.actived = true;
		console.log("Server work to html on port "+ locations.html.port);
	}

	if(!locations.icon.actived) {
		var server = http.createServer(icon);
		server.listen(locations.icon.port,locations.name);
		locations.icon.actived = true;
		console.log("Server work to icon on port "+ locations.icon.port);
	}

	if(!locations.default.actived) {
		var server = http.createServer(main);
		server.listen(locations.default.port,locations.name);
		locations.default.actived = true;
		console.log("Server work to default on port "+ locations.default.port);
	}
}