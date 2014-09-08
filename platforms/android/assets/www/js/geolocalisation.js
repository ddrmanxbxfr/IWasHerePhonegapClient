/*global alert, updateUiGeoConfirmation*/
var watchGeoID = null;
var isUserGeoLocated = false;

function verifierSiAccuracyEstOk(position) {
    "use strict";
    if (position.coords.accuracy <= 100) {
        return true;
    } else {
        return false;
    }
}


function onSuccessGeoLoc(position) {
    "use strict";
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
