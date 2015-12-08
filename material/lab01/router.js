/*jslint node:true */

"use strict";

function route(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello there!");
    response.end();
}

exports.route = route;
