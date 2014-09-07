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

function updateLabelGeoConfirmation(isGeoReady) {
    var docToUpdate = document.getElementById('geolocationStatus')
    if (isGeoReady) {
        docToUpdate.textContent = "We're preparing your black sharpie to write down a message here. Hold on.";
    } else {
        docToUpdate.textContent = "We're preparing your black sharpie to write down a message here. Hold on.";
    }
}


/* Stuff happends when app starts... */
document.addEventListener("deviceready", preparerOnDeviceReady, false);

window.onload = function () {
    "use strict";
    configurerBtnEvents();
};
