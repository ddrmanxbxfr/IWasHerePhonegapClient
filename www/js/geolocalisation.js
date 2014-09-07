/*global alert*/
var watchGeoID = null;

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
        updateUiGeoConfirmation(true);
    } else {
        updateUiGeoConfirmation(false);
    }
}

function onErrorGeoLoc(error) {
    "use strict";
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
