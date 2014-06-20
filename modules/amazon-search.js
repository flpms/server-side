var amazon = new Amazon();
amazon.search(searchParams.item);
eventEmitter.on("loadResults",function(result) {
	var processedData = amazon.processResult(result, searchParams.device);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(processedData));
	res.end();
});