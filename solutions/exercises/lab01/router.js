/*jslint node:true */

"use strict";
var url = require("url");
var exec = require("child_process").exec;


function sendResponse(response, content) {
    console.log("Sending response...");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write(content);
    response.end();
}

function ls(request, response) {
    console.log("Controller: ls");
    exec("ls -lah /", function (error, stdout, stderr) {
        sendResponse(response, stdout);
    });
}



function route(request, response) {
    ls(request, response);
}

exports.route = route;
