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
stopGeolocating, currentGeoCoords,$, hideOverlay, ich, setupBtnMarkTerritory, updateUiGeoConfirmation, addClass, removeClass, setupMarkTerritoryView, setupNearMarksView*/
var templateLoaded;

function forceCloseSideNav() {
    "use strict";
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
    "use strict";
    removeClass(document.getElementById(buttonNameOld), 'is-active');
    addClass(document.getElementById(buttonNameActive), 'is-active');
}

function getApiUrl() {
    "use strict";
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
