/*jslint node:true */
var fs = require('fs');
var util = require("util");
var exec = require("child_process").exec;


var watchFolder = null;
var slideshowFolder = null;
var watchIntervall = 10000;
var changeHandler = null;

function getFindCommand() {
    return ("find " + watchFolder + " -name '*.jpg' -o -name '*.JPG'" +
        " -o -name '*.gif' -o -name '*.GIF'" +
        " -o -name '*.bmp' -o -name '*.BMP'" +
        " -o -name '*.jpeg' -o -name '*.JPEG'" +
        " -o -name '*.png' -o -name '*.PNG'");
}

function logMovement(str) {
    console.log(str);
}


function processImage(path, filename) {
    util.debug(filename);
    path = path.replace(/'/g, "");
    //	(function(path, filename) {
    fs.rename(path, (slideshowFolder + "/" + filename), function (success) {
        util.debug("success: " + success);
        if (!success && changeHandler !== null) {
            //exec("jhead -autorot " + slideshowFolder + "/" + filename,
            //{ timeout: 30000, maxBuffer: 20000*1024 },
            //function (error, stdout, stderr) {
            changeHandler(filename);
            //});
        }
    });
    //	})();
}

function findAndMove() {
    var cmd = getFindCommand();
    console.log("Searching for images: " + cmd);
    exec(cmd, {
            timeout: 30000,
            maxBuffer: 20000 * 1024
        },
        function (error, stdout, stderr) {
            if (stdout.length > 0) {
                var files = stdout.split("\n");
                for (var i = 0; i < files.length; i++) {
                    if (files[i].length > 0) {
                        var path = files[i];
                        var tmpFilename = path.substr((files[i].lastIndexOf("/") + 1));
                        util.debug("Moving file and rotaing: " + tmpFilename);
                        var newFilename = new Date().getTime() + "_" + tmpFilename.replace(/ /g, "_");
                        logMovement(path + " ---> " + "../web/slideshow/" + newFilename + "\n");
                        processImage(path, newFilename);
                    }
                }
            }
            setTimeout(findAndMove, watchIntervall);
        });
}

function init(newChangeHandler, newWatchFolder, newSlideshowFolder, newWatchIntervall) {
    changeHandler = newChangeHandler;
    watchFolder = newWatchFolder;
    slideshowFolder = newSlideshowFolder;
    if (newWatchIntervall) {
        watchIntervall = newWatchIntervall;
    }
    util.debug("Watching folder: " + newWatchFolder + " for changes every " + watchIntervall + "ms");
    findAndMove();
}

exports.init = init;
