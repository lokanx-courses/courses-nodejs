/*jslint node:true */

"use strict";
var http = require('http');

function init(route) {
    var onRequest = function (request, response) {
        route(request, response);
    };
    http.createServer(onRequest).listen(8080, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:8080/');
}

exports.init = init;
