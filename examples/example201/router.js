var url = require("url");

var stdRoute = require("./controllers/stdRoute.js").route;
var longRoute = require("./controllers/longRoute.js").route;





function route(request, response) {
	var pathname = url.parse(request.url).pathname;
	if (pathname.indexOf("long") > -1) {
		longRoute(request, response, pathname);
	} else {
		stdRoute(request, response, pathname);
	}
}

exports.route = route;
