/*global $, ich*/
function setupNearMarksView() {
    "use strict";
    forceCloseSideNav();
    $('#main-content').empty();
    $('#main-content').append(ich.TemplateShowNearMarks());
    templateLoaded = "TemplateShowNearMarks";

    if (watchGeoID === undefined || watchGeoID === null) {
        startGeolocating();
    }
}

function parseGeoResultsSeeNearMarks() {
    "use strict";
    if (verifierSiAccuracyEstOk(position)) {
        /// OK WE CAN DOWNLOAD FROM API !
        document.getElementById('loadingModal').textContent = "Asking dog to sniff around for marks...";
    }
}
