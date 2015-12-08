/*jslint node:true */
var http = require('http');
var port = 3000;

var request = function (url, callback) {
    console.log(url);
    callback('Hello World');
};

exports.request = request;

http.createServer(function (req, res) {
    request(req.url, function (data) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(data);
    });
}).listen(port, '127.0.0.1');
