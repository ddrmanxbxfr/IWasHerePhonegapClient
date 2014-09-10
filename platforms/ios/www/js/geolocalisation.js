/*global alert, updateUiGeoConfirmation, templateLoaded, parseGeoResultsSeeNearMarks, parseGeoResultsMarkTerritory*/
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

    function runUiMethodsDependingOnView(position) {
        if (templateLoaded === "TemplateShowNearMarks") {
            parseGeoResultsSeeNearMarks(position);
        } else {
            if (templateLoaded === "TemplateMarkTerritory") {
                parseGeoResultsMarkTerritory(position);
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
    runUiMethodsDependingOnView(position);
}

function onErrorGeoLoc(error) {
    "use strict";
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n' +
         'Please enable GPS/Geolocalisation service and Internet');
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
        timeout: 5000,
        enableHighAccuracy: true
    };
    watchGeoID = navigator.geolocation.watchPosition(onSuccessGeoLoc, onErrorGeoLoc, options);
}
