/*
This file is part of I was here Phonegap client.

I was here Phonegap client is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

I was here Phonegap client is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with I was here Phonegap client.  If not, see <http://www.gnu.org/licenses/>.
*/

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
