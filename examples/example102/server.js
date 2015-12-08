/*jslint node:true */

var http = require('http');

function init(route) {
    var onRequest = function (request, response) {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        var content = route(request);
        response.write(content);
        response.end();
    };
    http.createServer(onRequest).listen(8080, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:8080/');
}

exports.init = init;
