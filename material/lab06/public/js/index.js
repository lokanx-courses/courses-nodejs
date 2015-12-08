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

    // Sends a message to the server via sockets
    function sendMessageToServer(message) {
        // TODO - Send message to server
    }

    function initSocket() {
        // Create SocketIO instance, connect

        // Add a connect listener
        // Add a message listener
        // Add a disconnect listener

        // Create an intervall
        setInterval(function () {
            sendMessageToServer("Hello server :)");
        }, 3000);
    }

    function init() {
        initSocket();
        $("#letsGooo").bind("click", letsGooo);
        $("#path").bind("keyup", keyHandler);
    }

    $(document).ready(init);
})();
