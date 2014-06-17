/**
* Author: Filipe M. Silva
* Date: 15/06/2014
* Version: 0.0.2
* About: Init Configs
* ChangeList: Code Division, Modules Creation, Work with Promisses.
**/

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var aws = require('aws-lib');
var handlebars = require('handlebars');
var Q = require('Q');

function main(req, res) {
	var urlData = url.parse(req.url);
	if (req.method.toUpperCase() === "GET" && urlData.pathname === "/search") {
		var searchParams = querystring.parse(urlData.query);
		searchParams.item = encodeURI(searchParams.item);
		if (searchParams.holmes === "true") {
			var holmes = new Holmes();
			holmes.prototype = new Amazon();
			holmes.start(searchParams.item, Date.parse(searchParams.until));
		} else {
			var amazon = new Amazon();
			amazon.search(searchParams.item);
			eventEmitter.on("loadResults",function(result) {
				var processedData = amazon.processResult(result, searchParams.device);
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(processedData));
				res.end();
			});
		}
	} else {
		res.end();
	}
};
