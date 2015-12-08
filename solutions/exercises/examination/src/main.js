/*jslint node:true */
"use strict";
var SLIDESHOW_FOLDER = "./public/slideshow";
//var WATCH_FOLDER = "./public/inbox";
var WATCH_FOLDER = "/Users/lokanx/Dropbox/Attachments";
var WATCH_INTERVALL = 5000;
var SLIDE_SHOW_BASE_URL = "/slideshow";

var server = require("./server.js");
var route = require("./router.js").route;
var socket = require("./socket.js");
var slideshow = require("./slideshow.js");
var httpServer = server.init(route, socket.eventHandlers);
var wsServer = socket.init(httpServer);
slideshow.init(wsServer, SLIDESHOW_FOLDER, SLIDE_SHOW_BASE_URL);
require("./watcher.js").init(slideshow.onNewImage, WATCH_FOLDER, SLIDESHOW_FOLDER, WATCH_INTERVALL);
