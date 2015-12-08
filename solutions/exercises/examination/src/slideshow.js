/*jslint node:true */
var util = require("util");
var exec = require("child_process").exec;

var config = {};
var clients = {};

function isNotImage(fileName) {
    if (fileName.toUpperCase() === "THUMBS.DB") {
        return true;
    } else if (fileName.toUpperCase().indexOf(".TXT") > -1) {
        return true;
    }

    return false;
}

function createImageList(callback) {

    exec("ls -1 " + config.slideshowFolder, function (error, stdout, stderr) {
        var fileNames = stdout.split("\n");
        var imageList = [];
        for (var i = 0; i < fileNames.length; i++) {
            if (fileNames[i].length > 0 && !isNotImage(fileNames[i])) {
                util.debug("Adding file: " + fileNames[i]);
                var imgData = {
                    "src": (config.slideshowBaseURL + "/" + fileNames[i])
                };
                imageList.push(imgData);
            }
        }
        callback(imageList);
    });
}


function sendMessage(client, id, data) {
    var message = {
        "id": id,
        "data": data
    };
    client.json.send(message);
}

function sendImageListToClient(client) {
    var imageListCallback = function (imageList) {
        sendMessage(client, "imageList", imageList);
    };
    createImageList(imageListCallback);
}

function init(wsServer, slideshowFolder, slideshowBaseURL) {
    config.slideshowFolder = slideshowFolder;
    config.slideshowBaseURL = slideshowBaseURL;

    wsServer.on('connection', function (client) {
        clients[client.id] = client;
        console.log("Slideshow client connected");
        sendImageListToClient(client);

        // Success!  Now listen to messages to be received
        client.on('message', function (event) {
            console.log('Received message from slideshow client: ' + util.inspect(event));
        });
        client.on('disconnect', function () {
            delete clients[client.id];
            console.log('Slideshow client disconnected');
        });
    });
}

function onNewImage(filename) {
    var clientName;
    for (clientName in clients) {
        if (clients.hasOwnProperty(clientName)) {
            sendMessage(clients[clientName], "newImage", {
                "src": (config.slideshowBaseURL + "/" + filename)
            });
        }
    }
}

exports.init = init;
exports.onNewImage = onNewImage;
