"use strict";
var exec = require("child_process").exec;


function sendResponse(response, content) {
	console.log("Sending response...");
	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(content);
    response.end();
}

function ls(path, request, response) {

	console.log("Controller: ls " + path);
	exec("ls -lah " + path, function (error, stdout, stderr) {
		sendResponse(response, stdout);
	});
}



function route(pathname, request, response) {
	var path = pathname.substring("/routes".length);
	if (path === "") {
		path = "/";
	}
	ls(path, request, response);
}

exports.route = route;
