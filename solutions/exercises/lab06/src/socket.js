/** @module socket */
/*jslint node:true */
"use strict";
var io = require('socket.io');
var util = require("util");
var socket = null;

/**
 * Sets up a timer for running periodic stuff with the web socket client
 *
 * @param {Client} client web socket client ref
 */
function initPeriodicMessage(client) {
    // Create periodical which ends a message to the client every 5 seconds
    var interval = setInterval(function () {
        //client.send('This is a message from the server!  ' + new Date().getTime());
        var msg = {
            "message": 'This is a message from the server!',
            "timestamp": new Date().getTime()
        };
        client.json.send(msg);
    }, 3000);

    return interval;
}


function init(server) {
    socket = io.listen(server);
    // Add a connect listener
    socket.on('connection', function (client) {
        var interval = initPeriodicMessage(client);

        // Success!  Now listen to messages to be received
        client.on('message', function (event) {
            console.log('Received message from client: ' + util.inspect(event));
        });
        client.on('disconnect', function () {
            clearInterval(interval);
            console.log('Client has disconnected');
        });

    });
}

/**
 * Inits module
 * @function
 * @param {HTTPServer} server http server reference
 */
exports.init = init;
