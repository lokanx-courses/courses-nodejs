/*jslint browser:true,devel:true,jquery:true */
/*global io */
(function () {
    function letsGooo() {
        var path = $("#path").val();
        if (path.indexOf("/") === 0) {
            path = path.substring(1);
        }

        $.get(('/routes/' + path), function (data) {
            $('#goooResult').empty().html($("<pre></pre>").append(data));
        });
    }

    function keyHandler(event) {
        if (event.keyCode === 13) {
            letsGooo();
            return false;
        }

        return true;
    }

    var socket = null;
    var intervalRef = null;

    // Sends a message to the server via sockets
    function sendMessageToServer(message) {
        var msg = {
            "message": message,
            "timestamp": new Date().getTime()
        };
        console.log("Sening message to server: " + JSON.stringify(msg));
        socket.json.send(msg);
    }

    function initSocket() {
        // Create SocketIO instance, connect
        socket = io.connect("http://127.0.0.1:8080", {
            "reconnection": false,
            "forceNew": true
        });

        // Add a connect listener
        socket.on('connect', function () {
            console.log('Client has connected to the server!');
            intervalRef = setInterval(function () {
                sendMessageToServer("Hello server :)");
            }, 3100);
            $("#socketControlButtonId").attr("value", "Disconnect");
        });
        // Add a connect listener
        socket.on('message', function (data) {
            console.log('[SERVER] ', JSON.stringify(data));
        });
        // Add a disconnect listener
        socket.on('disconnect', function () {
            console.log('The client has disconnected!');
            if (intervalRef) {
                clearInterval(intervalRef);
            }
            socket = null;
            $("#socketControlButtonId").attr("value", "Connect");
        });
    }

    function socketControlButtonClick() {
        if (socket) {
            socket.disconnect();
        } else {
            initSocket();
        }
    }

    function init() {
        initSocket();
        $("#letsGooo").bind("click", letsGooo);
        $("#path").bind("keyup", keyHandler);
        $("#socketControlButtonId").bind("click", socketControlButtonClick);
    }


    $(document).ready(init);
})();
