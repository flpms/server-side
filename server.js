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
var 



/**
 * Author: Filipe Melo da Silva
 * Date: 17/03/2014
 * Version: 0.0.1
 */
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var aws = require('aws-lib');
var express = require("express");
var logfmt = require("logfmt");

function Product() {
	this.id = "";
	this.price = "";
	this.imageURI = "";
	this.name = "";
};

/**
 * Object to search on Amazon;
 */
function Amazon() {
	this.prodAdv = aws.createProdAdvClient('AKIAITQ6ZAW76OJAH6HQ', 'MJmksfGd67wxX0tFJenCnLo82lR0QDLiMsEdTrwm', 'socialc06-20');
	this.options = { SearchIndex: 'All', Keywords: null, ResponseGroup: 'Images, ItemAttributes, VariationSummary' };
	/** Search for item on Amazon;
	 * @param Item
	 **/
	this.search = function(item) {
		this.options.Keywords = item;
		this.prodAdv.call('ItemSearch', this.options, this.result);
	};
	/** Pass to callback
	 * @returns Search Result
	 */
	this.result = function(err, result) {
		var isValid = eval(new String(result.Items.Request.IsValid).toLowerCase());
		if (!err && isValid == true) {
			eventEmitter.emit('loadResults', result);
		} else {
			console.error("(X)  Error: "+err);
			eventEmitter.emit('loadResults', err);
		}
		eventEmitter.emit('load');
	};
	this.processResult = function(rawData,device) {
		var data = eval(rawData);
		var items = data.Items;
		var products = [];
		for(var i = 0; i < items.Item.length; i++) {
			var item = items.Item[i];
			if (item.ItemAttributes.ListPrice) {
				var product = new Product();
				product.id = item.ASIN;
				switch(device) {
					case 'mobile':
						//change to Thumbnail
						product.imageURI = item.SmallImage.URL;
						break;
					case 'tablet':
						product.imageURI = item.MediumImage.URL;
						break;
					default: 
						product.imageURI = item.LargeImage.URL;
						break;
				}
				product.name = item.ItemAttributes.Title;
				product.price = item.ItemAttributes.ListPrice.FormattedPrice;
				products.push(product);
			}
		}
		//return JSON.stringify(products);
		return products;
	};
	this.id = Date.now();
	console.info("-(!) Amazon Initialized \n --- ID: "+this.id);
};

function Holmes() {
	console.log("Holmes Started");
	this.item = "";
	this.result ='';
	this.err = '';
	this.processData = function(data) {
		console.log(data);
		console.log();
	};
	this.holmesCastData = function(obj) {
		return JSON.stringify(obj);
	};
	this.search = function() {
		var amazon = Amazon();
		amazon.search(item);
	};
	this.start = function(item, endDate) {
		console.log("Start search: "+item+" - End Search "+endDate);
	};
};

function main(req, res) {
	var urlData = url.parse(req.url);
	if (req.method.toUpperCase() === "GET" && urlData.pathname === "/search") {
		var searchParams = querystring.parse(urlData.query);
		searchParams.item = encodeURI(searchParams.item);
		if (searchParams.holmes === "true") {
			var holmes = new Holmes();
			holmes.prototype = Amazon;
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

var app = express();
app.use(logfmt.requestLogger());

app.get('/search', function(req, res) {
	main(req,res);
});

app.get('/',function(req,res){
	res.send('Everything OK! Great!');
}); 

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});