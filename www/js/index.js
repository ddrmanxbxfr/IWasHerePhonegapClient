/*global console */
var watchGeoID = null;

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


// onSuccess Geolocation
//
function onSuccessGeoLoc(position) {
    "use strict";
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        '<hr />' + element.innerHTML;
}

// onError Callback receives a PositionError object
//
function onErrorGeoLoc(error) {
    "use strict";
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

function preparerOnDeviceReady() {
    "use strict";
    var options = {
        timeout: 30000
    };
    watchID = navigator.geolocation.watchPosition(onSuccessGeoLoc, onErrorGeoLoc, options);
}

document.addEventListener("deviceready", preparerOnDeviceReady, false);

window.onload = function () {
    "use strict";
    configurerBtnEvents();
};
