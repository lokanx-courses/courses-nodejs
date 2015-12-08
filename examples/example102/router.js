/*jslint node:true */

var url = require("url");

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

function route(request) {
    var pathname = url.parse(request.url).pathname;

    if (pathname.indexOf("long") > -1) {
        sleep(10000); // Sleep 10 seconds
    }

    return "Long time request for " + pathname + " received: " + new Date();
}

exports.route = route;
