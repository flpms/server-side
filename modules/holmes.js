var holmes = new Holmes();
			holmes.prototype = new Amazon();
			holmes.start(searchParams.item, Date.parse(searchParams.until));