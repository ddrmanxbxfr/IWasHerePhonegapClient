/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID, isUserGeoLocated, showOverlay, startGeolocating,
stopGeolocating, currentGeoCoords,$, hideOverlay*/


function overlay_sendToAPI_HideOverlay() {
    "use strict";
    var btnSendToApiClose;
    btnSendToApiClose = document.getElementById('btnSendToApiClose');
    if (btnSendToApiClose.classList.contains('off') === false) {
        btnSendToApiClose.classList.add('off');
    }

    startGeolocating();

    hideOverlay('overlay_sendingToAPI');
}

function overlay_sendToAPI_LoadingDone() {
    "use strict";
    var elementToChange, btnSendToApiClose;
    elementToChange = document.getElementById('currentProgress');
    btnSendToApiClose = document.getElementById('btnSendToApiClose');
    // List of class to swap fa-circle-o-notch fa-spin
    if (elementToChange.classList.contains('fa-spin')) {
        elementToChange.classList.remove('fa-spin');
    }

    if (elementToChange.classList.contains('fa-circle-o-notch')) {
        elementToChange.classList.remove('fa-circle-o-notch');
    }

    if (elementToChange.classList.contains('fa-check-square') === false) {
        elementToChange.classList.add('fa-check-square');
    }

    if (elementToChange.classList.contains('green-icon') === false) {
        elementToChange.classList.add('green-icon');
    }

    document.getElementById('sendToApiTxtProgress').textContent = "Thanks for marking your territory here !";
    if (btnSendToApiClose.classList.contains('off')) {
        btnSendToApiClose.classList.remove('off');
    }
}

function sendToApi() {
    "use strict";

    function createGeoJsonFromProps(txtIfPresent) {
        var baseData = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [currentGeoCoords.lat, currentGeoCoords.lng]
            },
            "properties": {
                geoAccuracy: currentGeoCoords.accuracy
            }
        };

        if (txtIfPresent !== undefined && txtIfPresent.length > 0) {
            baseData.properties.textNote = txtIfPresent;
        }
        return baseData;
    }
    var txtArea, request, data;
    txtArea = document.getElementById('txtNote').textContent;

    data = createGeoJsonFromProps(txtArea);

    // Do prepare the request to send to api...
    $.post('http://192.168.2.26:4711/api/iwashere', data, function (response) {
        if (document.getElementById('overlay_sendingToAPI').classList.contains('off') === false) {
            overlay_sendToAPI_LoadingDone();
        }
    });

    hideOverlay('overlay_leaveAMessage');
    showOverlay('overlay_sendingToAPI');
    document.getElementById('sendToApiTxtProgress').textContent = "Please wait while our dog chews your infos.";
}


function modalMarkTerritory() {
    "use strict";
    if (isUserGeoLocated && currentGeoCoords !== undefined) {
        stopGeolocating();
        showOverlay('overlay_leaveAMessage');
    }
}

function configurerBtnEvents() {
    "use strict";
    var slideMenuButton, btnMarkYourTerritory, btnSendToApi, btnSendToApiClose;
    slideMenuButton = document.getElementById('slide-menu-button');
    btnMarkYourTerritory = document.getElementById('roundBtn');
    btnSendToApi = document.getElementById('btnSendToApi');
    btnSendToApiClose = document.getElementById('btnSendToApiClose');
    slideMenuButton.onclick = function (e) {
        if (document.body.classList.contains('left-nav')) {
            document.body.classList.remove('left-nav');
        } else {
            document.body.classList.add('left-nav');
        }
    };

    btnMarkYourTerritory.onclick = modalMarkTerritory;
    btnSendToApi.onclick = sendToApi;
    btnSendToApiClose.onclick = overlay_sendToAPI_HideOverlay;
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
        if (btnMark.classList.contains('round-button-circle-not-ready')) {
            btnMark.classList.remove('round-button-circle-not-ready');
        }
        if (btnMark.contains('round-button-circle-ready') === false) {
            btnMark.classList.add('round-button-circle-ready');
        }
        if (btnMark.contains('button-ready') === false) {
            btnMark.classList.add('button-ready');
        }
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
document.addEventListener("deviceready", startGeolocating, false);

window.onload = function () {
    "use strict";
    configurerBtnEvents();
    updateUiGeoConfirmation(false);
};
