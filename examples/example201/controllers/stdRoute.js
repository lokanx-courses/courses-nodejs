function stdRoute(request, response, pathname) {
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Standard time request for " + pathname + " received:" + new Date());
    response.end();
}

exports.route = stdRoute;
