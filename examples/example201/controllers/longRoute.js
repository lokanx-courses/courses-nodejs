function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}


function longRoute(request, response, pathname) {
	setTimeout(function() {
		response.writeHead(200, {"Content-Type": "text/plain"});
	    response.write("Long time request for " + pathname + " received: " + new Date());
	    response.end();
	}, 10000);

}

exports.route = longRoute;
