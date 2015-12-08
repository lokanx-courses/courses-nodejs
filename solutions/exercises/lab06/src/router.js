/**
 * Handles http server routing
 * @module router
 */

/*jslint node:true */
"use strict";
var exec = require("child_process").exec;


function sendResponse(response, content) {
    console.log("Sending response...");
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
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

/**
 * Inits module
 * @function
 * @param {String} pathname  Request path name
 * @param {Request} request Request path name
 * @param {Response} response  Request path name
 */
exports.route = route;
