/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID, isUserGeoLocated, showOverlay, startGeolocating,
stopGeolocating, currentGeoCoords,$, hideOverlay, ich*/

function setupSideMenuBtn() {
    "use strict";
    var slideMenuButton;
    slideMenuButton = document.getElementById('slide-menu-button');
    slideMenuButton.onclick = function (e) {
        if (document.body.classList.contains('left-nav')) {
            document.body.classList.remove('left-nav');
        } else {
            document.body.classList.add('left-nav');
        }
    };
}

/* Stuff happends when app starts... */
document.addEventListener("deviceready", startGeolocating, false);

window.onload = function () {
    "use strict";
    var template = ich.TemplateMarkTerritory();
    $('#main-content').append(template);
    setupSideMenuBtn();
    setupBtnMarkTerritory();
    updateUiGeoConfirmation(false);
};
