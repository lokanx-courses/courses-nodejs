"use strict";
var url = require("url");

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    var endDate = new Date().getTime();
    do {
        endDate = new Date().getTime();
    } while (endDate < startTime + milliSeconds);
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

function route(request, response) {
	var pathname = url.parse(request.url).pathname;
	if (pathname.indexOf("long") > -1) {
		setTimeout(function() {
			response.writeHead(200, {"Content-Type": "text/plain"});
		    response.write("Long time request for " + pathname + " received: " + new Date());
		    response.end();
		}, 10000);
	} else {
		response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write("Long time request for " + pathname + " received:" + new Date());
	    response.end();
	}
}

exports.route = route;
