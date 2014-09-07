/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID */
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

function updateUiGeoConfirmation(isGeoReady) {
    "use strict";
    var docToUpdate, btnMark;
    docToUpdate = document.getElementById('geolocationStatus');
    btnMark = document.getElementById('roundBtn');
    if (isGeoReady) {
        docToUpdate.textContent = "Ok ! you're ready to mark your territory";
        if (btnMark.classList.contains('button-not-ready')) {
            btnMark.classList.remove('button-not-ready');
        }


        btnMark.classList.add('button-ready');
    } else {
        docToUpdate.textContent = "We're preparing your black sharpie to write down a message here. Hold on.";
        if (btnMark.classList.contains('button-ready')) {
            btnMark.classList.remove('button-ready');
        }
        if (btnMark.classList.contains('round-button-circle-ready')) {
            btnMark.classList.remove('round-button-circle-ready');
        }
        if (btnMark.classList.contains('button-not-ready') === false) {
            btnMark.classList.add('button-not-ready');
        }
        if (btnMark.classList.contains('round-button-circle-not-ready') === false) {
            btnMark.classList.add('round-button-circle-not-ready');
        }
    }
}


/* Stuff happends when app starts... */
document.addEventListener("deviceready", preparerOnDeviceReady, false);

window.onload = function () {
    "use strict";
    configurerBtnEvents();
};
