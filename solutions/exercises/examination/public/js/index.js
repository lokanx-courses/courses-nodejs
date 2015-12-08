/*jslint browser:true,devel:true,jquery:true */
/*global io */
(function () {

    var currentImageDiv = null;
    var SCREEN_WIDTH = 750;
    var SCREEN_HEIGHT = 520;
    var IMAGE_INTERVALL = 8000;

    var imageList = [];
    var currentIndex = -1;
    var socket = null;
    var sneakQueue = [];


    function nextIndex() {
        currentIndex++;
        if (currentIndex >= imageList.length) {
            currentIndex = 0;
        }

        return currentIndex;
    }

    function replaceImage(img) {
        //$("#currentImageId").fadeOut().remove();
        $("#currentImageId").hide().remove();
        if (img && img.style) {
            img.style.display = "none";
            currentImageDiv.append($(img).fadeIn());
        }
    }

    function nextImage() {
        var index = nextIndex();

        if (sneakQueue.length > 0) {
            var sneakImage = sneakQueue.shift();
            imageList.splice(index, 0, sneakImage);
        }

        if (imageList[index].img) {
            replaceImage(imageList[index].img);
        } else {
            var img = document.createElement("img");
            img.id = "currentImageId";

            img.onload = function () {
                var width = this.width;
                var height = this.height;
                var newHeight = height;
                var newWidth = width;
                if (width <= SCREEN_WIDTH && height <= SCREEN_HEIGHT) {
                    if (width > height) {
                        newHeight = SCREEN_WIDTH * height / width;
                        newWidth = SCREEN_WIDTH;
                        if (newHeight > SCREEN_HEIGHT) {
                            newWidth = SCREEN_HEIGHT * width / height;
                            newHeight = SCREEN_HEIGHT;
                        }
                    } else {
                        newWidth = SCREEN_HEIGHT * width / height;
                        newHeight = SCREEN_HEIGHT;
                        if (newWidth > SCREEN_WIDTH) {
                            newHeight = SCREEN_WIDTH * height / width;
                            newWidth = SCREEN_WIDTH;
                        }
                    }
                } else if (width > SCREEN_WIDTH && height <= SCREEN_HEIGHT) {
                    newWidth = SCREEN_HEIGHT * width / height;
                    newHeight = SCREEN_HEIGHT;
                    if (newWidth > SCREEN_WIDTH) {
                        newHeight = SCREEN_WIDTH * height / width;
                        newWidth = SCREEN_WIDTH;
                    }
                } else if (width <= SCREEN_WIDTH && height > SCREEN_HEIGHT) {
                    newHeight = SCREEN_WIDTH * height / width;
                    newWidth = SCREEN_WIDTH;
                    if (newHeight > SCREEN_HEIGHT) {
                        newWidth = SCREEN_HEIGHT * width / height;
                        newHeight = SCREEN_HEIGHT;
                    }
                } else {
                    if (width > height) {
                        newHeight = SCREEN_WIDTH * height / width;
                        newWidth = SCREEN_WIDTH;
                        if (newHeight > SCREEN_HEIGHT) {
                            newWidth = SCREEN_HEIGHT * width / height;
                            newHeight = SCREEN_HEIGHT;
                        }
                    } else {
                        newWidth = SCREEN_HEIGHT * width / height;
                        newHeight = SCREEN_HEIGHT;
                        if (newWidth > SCREEN_WIDTH) {
                            newHeight = SCREEN_WIDTH * height / width;
                            newWidth = SCREEN_WIDTH;

                        }
                    }
                }
                this.width = newWidth;
                this.height = newHeight;
                console.log("Next image: " + img.src + ": [" + width + ", " + height + "] ---> [" + newWidth + ", " + newHeight + "]");
                this.style.display = "none";
                replaceImage(img);
            };
            img.src = imageList[index].src;
            imageList[index].img = img;
        }
    }


    function loadNextImage() {
        nextImage();
        setTimeout(loadNextImage, IMAGE_INTERVALL);
    }

    function handleMessage(message) {
        if (message.id === "imageList") {
            imageList = message.data;
            loadNextImage();
        } else if (message.id === "newImage") {
            sneakQueue.push(message.data);
        } else {
            console.log("Uknown message received: " + JSON.stringify(message));
        }
    }

    function initSocket() {
        // Create SocketIO instance, connect
        socket = io.connect("http://127.0.0.1:8080");

        // Add a connect listener
        socket.on('connect', function () {
            console.log('Client has connected to the server!');
        });
        // Add a connect listener
        socket.on('message', function (data) {
            console.log('[SERVER] ', JSON.stringify(data));
            handleMessage(data);
        });
        // Add a disconnect listener
        socket.on('disconnect', function () {
            console.log('The client has disconnected!');
        });


    }

    function init() {
        initSocket();
        currentImageDiv = $("#currentImageDivId");
    }


    $(document).ready(init);
})();
