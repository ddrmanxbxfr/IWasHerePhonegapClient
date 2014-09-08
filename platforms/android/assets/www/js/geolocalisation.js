/*global alert, updateUiGeoConfirmation*/
var currentGeoCoords, watchGeoID, isUserGeoLocated;
watchGeoID = null;
isUserGeoLocated = false;

function onSuccessGeoLoc(position) {
    "use strict";

    function verifierSiAccuracyEstOk(position) {
        "use strict";
        if (position.coords.accuracy <= 2000) {
            return true;
        } else {
            return false;
        }
    }

    function runUiMethodsDependingOnView() {
        "use strict";
        if (templateLoaded === "TemplateShowNearMarks") {
            parseGeoResultsSeeNearMarks();
        } else {
            if (templateLoaded === "TemplateMarkTerritory") {
                parseGeoResultsMarkTerritory();
            }
        }
    }

    currentGeoCoords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy
    };
    var element = document.getElementById('geolocation');
    isUserGeoLocated = true;
    runUiMethodsDependingOnView();
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
