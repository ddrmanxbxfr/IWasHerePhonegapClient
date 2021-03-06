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
/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID, isUserGeoLocated, showOverlay, startGeolocating,
stopGeolocating, currentGeoCoords,$, hideOverlay, ich, addClass, removeClass, forceCloseSideNav, templateLoaded:true, verifierSiAccuracyEstOk, setupActiveButton, getApiUrl, alert*/

var apiTextToSubmit, apiImageToSubmit;


function updateUiGeoConfirmation(isGeoReady) {
    "use strict";
    var docToUpdate, btnMark;
    docToUpdate = document.getElementById('geolocationStatus');
    btnMark = document.getElementById('roundBtn');
    if (isGeoReady) {
        docToUpdate.textContent = "Ok ! you're ready to mark your territory";

        removeClass(btnMark, 'button-not-ready');
        removeClass(btnMark, 'round-button-circle-not-ready');
        addClass(btnMark, 'round-button-circle-ready');
        addClass(btnMark, 'button-ready');
    } else {
        docToUpdate.textContent = "We're preparing your black sharpie to write down a message here. Hold on.";
        addClass(btnMark, 'button-not-ready');
        addClass(btnMark, 'round-button-circle-not-ready');
        removeClass(btnMark, 'round-button-circle-ready');
        removeClass(btnMark, 'button-ready');
    }
}

function setupBtnMarkTerritory() {
    "use strict";

    function overlay_sendToAPI_LoadingDone() {
        var elementToChange, btnSendToApiClose;
        elementToChange = document.getElementById('currentProgress');
        btnSendToApiClose = document.getElementById('btnSendToApiClose');
        // List of class to swap fa-circle-o-notch fa-spin
        removeClass(elementToChange, 'fa-spin');
        removeClass(elementToChange, 'fa-circle-o-notch');
        removeClass(btnSendToApiClose, 'off');
        addClass(elementToChange, 'fa-check-square');
        addClass(elementToChange, 'green-icon');

        document.getElementById('sendToApiTxtProgress').textContent = "Thanks for marking your territory here !";
    }

    function modalMarkTerritory() {
        /* fonction pour init le choose mode... */
        function setupChooseMode() {
            function setupBtnChooseMode() {

                function sendToApi() {
                    function overlay_sendToAPI_SetUIForLoading() {
                        var elementToChange, btnSendToApiClose;
                        elementToChange = document.getElementById('currentProgress');
                        btnSendToApiClose = document.getElementById('btnSendToApiClose');
                        document.getElementById('sendToApiTxtProgress').textContent = "Please wait while our dog chews your infos.";
                        addClass(elementToChange, 'fa-spin');
                        addClass(elementToChange, 'fa-circle-o-notch');
                        addClass(btnSendToApiClose, 'off');
                        removeClass(elementToChange, 'fa-check-square');
                        removeClass(elementToChange, 'green-icon');
                    }

                    function overlay_sendToAPI_HideOverlay() {
                        addClass(document.getElementById('btnSendToApiClose'), 'off');
                        startGeolocating();
                        // Clear memory for cached vars
                        apiImageToSubmit = null;
                        apiTextToSubmit = null;
                        hideOverlay('overlay_sendingToAPI');
                    }

                    function createGeoJsonFromProps() {
                        var baseData = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [currentGeoCoords.lng, currentGeoCoords.lat]
                            },
                            "properties": {
                                geoAccuracy: currentGeoCoords.accuracy
                            }
                        };

                        if (apiTextToSubmit !== undefined && apiTextToSubmit !== null &&  apiTextToSubmit.length > 0) {
                            baseData.properties.textNote = apiTextToSubmit;
                        }

                        // Picture mode..
                        if (apiImageToSubmit !== undefined && apiImageToSubmit !== null) {
                            baseData.properties.picture = apiImageToSubmit;
                        }

                        return baseData;
                    }
                    var request, data;

                    data = createGeoJsonFromProps();

                    // Do prepare the request to send to api...
                    $.post(getApiUrl(), data, function (response) {
                        apiImageToSubmit = undefined;

                        if (document.getElementById('overlay_sendingToAPI').classList.contains('off') === false) {
                            overlay_sendToAPI_LoadingDone();
                        }
                    });

                    hideOverlay('overlay_leaveAMessage');
                    showOverlay('overlay_sendingToAPI');
                    overlay_sendToAPI_SetUIForLoading();
                    document.getElementById('btnSendToApiClose').onclick = overlay_sendToAPI_HideOverlay;
                }


                function overlay_EnterMsg_CloseModal() {
                    startGeolocating();
                    hideOverlay('overlay_leaveAMessage');
                    // Clear memory for cached vars
                    apiImageToSubmit = undefined;
                    apiTextToSubmit = undefined;
                }

                function overlay_modePicture_Enter() {
                    function onPhotoDataSuccess(imageData) {
                        apiImageToSubmit = "data:image/jpeg;base64," + imageData;
                        setupBtnColor();
                    }

                    function onFail(message) {
                        alert('Can\'t use camera mode because... ' + message);
                    }

                    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.DATA_URL
                    });
                }

                function overlay_modeText_Enter() {
                    function setupBtn() {
                        function goBackToChooseMode() {
                            apiTextToSubmit = document.getElementById('txtNote').value;
                            modalMarkTerritory();
                        }
                        document.getElementById('btnSendToApi').onclick = goBackToChooseMode;
                        document.getElementById('btnCancel').onclick = modalMarkTerritory;
                    }

                    $('#templateMode').empty();
                    $('#templateMode').append(ich.TemplateTextMode());
                    setupBtn();
                }

                document.getElementById('btnModeCancel').onclick = overlay_EnterMsg_CloseModal;
                document.getElementById('btnModeNote').onclick = overlay_modeText_Enter;
                document.getElementById('btnModePicture').onclick = overlay_modePicture_Enter;
                document.getElementById('btnModeSendApi').onclick = sendToApi;
            }


            function setupBtnColor() {
                var addClassHappened = false;
                if (apiImageToSubmit !== undefined && apiImageToSubmit !== null) {
                    addClass(document.getElementById('btnModePicture'), 'button-ready');
                    addClassHappened = true;
                }
                if (apiTextToSubmit !== undefined && apiTextToSubmit !== null) {
                    addClass(document.getElementById('btnModeNote'), 'button-ready');
                    addClassHappened = true;
                }
                if (addClassHappened) {
                    removeClass(document.getElementById('btnModeSendApi'), 'off');
                }
            }

            $('#templateMode').empty();
            $('#templateMode').append(ich.TemplateChooseMode());
            setupBtnChooseMode();
            setupBtnColor();

        }


        if (isUserGeoLocated && currentGeoCoords !== undefined) {
            stopGeolocating();
            setupChooseMode();
            showOverlay('overlay_leaveAMessage');
        }
    }

    var btnMarkYourTerritory;
    btnMarkYourTerritory = document.getElementById('roundBtn');
    btnMarkYourTerritory.onclick = modalMarkTerritory;
}


function setupMarkTerritoryView() {
    "use strict";
    forceCloseSideNav();

    setupActiveButton('side-navBtnMarkTerritory', 'side-navBtnSeeNearMarks');

    // Must start geo if it's not running.....
    if (watchGeoID === undefined || watchGeoID === null) {
        startGeolocating();
    }

    $('#main-content').empty();
    $('#main-content').append(ich.TemplateMarkTerritory());
    templateLoaded = "TemplateMarkTerritory";
    setupBtnMarkTerritory();
    updateUiGeoConfirmation(false);
}

function parseGeoResultsMarkTerritory(position) {
    "use strict";
    document.getElementById('gpsAccuracy').textContent = position.coords.accuracy;
    if (verifierSiAccuracyEstOk(position)) {
        updateUiGeoConfirmation(true);
    } else {
        updateUiGeoConfirmation(false);
    }
}
