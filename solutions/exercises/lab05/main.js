"use strict";
var server = require("./server.js");
var route = require("./router.js").route;

var httpServer = server.init(route);

