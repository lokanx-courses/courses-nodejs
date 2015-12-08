/*jslint node:true */

"use strict";
var server = require("./server.js");
var route = require("./router.js").route;
server.init(route);
