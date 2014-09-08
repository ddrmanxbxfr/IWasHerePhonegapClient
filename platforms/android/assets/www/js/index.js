/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID, isUserGeoLocated, showOverlay, startGeolocating,
stopGeolocating, currentGeoCoords,$, hideOverlay, ich, setupBtnMarkTerritory, updateUiGeoConfirmation*/
var templateLoaded;

function forceCloseSideNav() {
    if (document.body.classList.contains('left-nav')) {
        document.body.classList.remove('left-nav');
    }
}

function animateSideMenu() {
    "use strict";
    if (document.body.classList.contains('left-nav')) {
        document.body.classList.remove('left-nav');
    } else {
        document.body.classList.add('left-nav');
    }
}


function setupActiveButton(buttonNameActive, buttonNameOld) {
    removeClass(document.getElementById(buttonNameOld), 'is-active');
    addClass(document.getElementById(buttonNameActive), 'is-active');
}

function getApiUrl() {
    return "http://vps84512.ovh.net:4712/api/iwashere/";
}

function setupSideMenuBtn() {
    "use strict";
    var slideMenuButton, sidenavBtnMarkTerritory, sidenavBtnSeeNearMarks;
    slideMenuButton = document.getElementById('slide-menu-button');
    sidenavBtnSeeNearMarks = document.getElementById('side-navBtnSeeNearMarks');
    sidenavBtnMarkTerritory = document.getElementById('side-navBtnMarkTerritory');
    slideMenuButton.onclick = animateSideMenu;
    sidenavBtnMarkTerritory.onclick = setupMarkTerritoryView;
    sidenavBtnSeeNearMarks.onclick = setupNearMarksView;
}

/* Stuff happends when app starts... */
document.addEventListener("deviceready", startGeolocating, false);

window.onload = function () {
    "use strict";
    setupSideMenuBtn();
    setupMarkTerritoryView();
};
