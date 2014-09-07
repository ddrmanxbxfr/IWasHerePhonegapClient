/*global console */
function configurerBtnEvents() {
    "use strict";
    var slideMenuButton = document.getElementById('slide-menu-button');
    slideMenuButton.onclick = function (e) {
        var cl = document.body.classList;
        if (cl.contains('left-nav')) {
            cl.remove('left-nav');
        } else {
            cl.add('left-nav');
        }
    };
}

function preparerOnDeviceReady() {
    "use strict";
    var options = {
        timeout: 30000,
        enableHighAccuracy: true
    };
    watchGeoID = navigator.geolocation.watchPosition(onSuccessGeoLoc, onErrorGeoLoc, options);
}

document.addEventListener("deviceready", preparerOnDeviceReady, false);

window.onload = function () {
    "use strict";
    configurerBtnEvents();
};
