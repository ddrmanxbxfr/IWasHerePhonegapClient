/*global alert, updateUiGeoConfirmation*/
var currentGeoCoords, watchGeoID, isUserGeoLocated;
watchGeoID = null;
isUserGeoLocated = false;


function verifierSiAccuracyEstOk(position) {
    "use strict";
    if (position.coords.accuracy <= 2000) {
        return true;
    } else {
        return false;
    }
}


function onSuccessGeoLoc(position) {
    "use strict";
    currentGeoCoords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
    };
    var element = document.getElementById('geolocation');
    if (verifierSiAccuracyEstOk(position)) {
        isUserGeoLocated = true;
        updateUiGeoConfirmation(true);
    } else {
        isUserGeoLocated = false;
        updateUiGeoConfirmation(false);
    }
}

function onErrorGeoLoc(error) {
    "use strict";
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

function stopGeolocating() {
    "use strict";
    if (watchGeoID !== null) {
        navigator.geolocation.clearWatch(watchGeoID);
        watchGeoID = null;
    }
}

function startGeolocating() {
    "use strict";
    var options = {
        timeout: 30000,
        enableHighAccuracy: true
    };
    watchGeoID = navigator.geolocation.watchPosition(onSuccessGeoLoc, onErrorGeoLoc, options);
}
