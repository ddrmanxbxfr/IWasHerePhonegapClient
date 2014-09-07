var watchGeoID = null;

function verifierSiAccuracyEstOk(position) {
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
        element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
            'Longitude: ' + position.coords.longitude + '<br />' +
            '<hr />' + element.innerHTML;
    }
}

function onErrorGeoLoc(error) {
    "use strict";
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
