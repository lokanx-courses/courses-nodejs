/*jslint node:true */

"use strict";
var http = require('http');
var nstatic = require('node-static');
var url = require("url");


function init(route) {
    var file = new(nstatic.Server)('./public');

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        if (pathname.indexOf("/routes") === 0) {
            route(pathname, request, response);
        } else {
            file.serve(request, response);
        }
    }
    http.createServer(onRequest).listen(8080, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:8080/');
}

exports.init = init;
