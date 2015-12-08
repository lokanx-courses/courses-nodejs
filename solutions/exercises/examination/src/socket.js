/*jslint node:true */
"use strict";
var io = require('socket.io');
var util = require("util");
var socket = null;


function init(server) {
    socket = io.listen(server);
    // Add a connect listener
    socket.on('connection', function (client) {
        console.log("Client connected");

        // Success!  Now listen to messages to be received
        client.on('message', function (event) {
            console.log('Received message from client: ' + util.inspect(event));
        });
        client.on('disconnect', function () {
            console.log('Client disconnected');
        });

    });

    return socket;
}

exports.init = init;
