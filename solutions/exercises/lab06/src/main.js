/**
 * Main - kicks everything off
 * @module main
 */

/*jslint node:true */
"use strict";
var server = require("./server.js");
var route = require("./router.js").route;
var socket = require("./socket.js");
socket.init(server.init(route, socket.eventHandlers));
