/*global $,document */

(function () {
    "use strict";

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

    function init() {
        $("#letsGooo").bind("click", letsGooo);
        $("#path").bind("keyup", keyHandler);
    }


    $(document).ready(init);
}());
