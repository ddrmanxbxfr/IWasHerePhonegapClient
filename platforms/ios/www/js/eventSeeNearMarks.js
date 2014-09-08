/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID, isUserGeoLocated, showOverlay, startGeolocating,
stopGeolocating, currentGeoCoords,$, hideOverlay, ich, setupBtnMarkTerritory, updateUiGeoConfirmation, forceCloseSideNav, templateLoaded, verifierSiAccuracyEstOk*/
function setupNearMarksView() {
    "use strict";
    forceCloseSideNav();
    $('#main-content').empty();
    $('#main-content').append(ich.TemplateShowNearMarks());
    templateLoaded = "TemplateShowNearMarks";
    setupActiveButton('side-navBtnSeeNearMarks', 'side-navBtnMarkTerritory');
    if (watchGeoID === undefined || watchGeoID === null) {
        startGeolocating();
    }
}

function parseGeoResultsSeeNearMarks(position) {
    "use strict";
    if (verifierSiAccuracyEstOk(position)) {
        /// OK WE CAN DOWNLOAD FROM API !
        document.getElementById('loadingModal').textContent = "Asking dog to sniff around for marks...";
        fetchNearMarksFromAPI();
    }
}

function fetchNearMarksFromAPI() {
    "use strict";

    function formatUrl(toleratedRadius) {
        return getApiUrl() + 100 + '/' + currentGeoCoords.lat + '/' + currentGeoCoords.lng;
    }

    stopGeolocating();
    $.getJSON(formatUrl(100), function (data) {
        document.getElementById('loadingModal').textContent = "We got everything. Oiling the crank.";
        parseApiResults(data);
        addClass(document.getElementById('overlay_loadingDataAndGeoLocating'), 'off');
    });
}


function parseApiResults(data) {
    "use strict";
    var list, listStatistics, listItems, len, iCpt;
    len = data.features.length;
    listItems = [];
    for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
        listItems.push(ich.TemplateShowNearMarks_Item({
            name: data.features[iCpt].properties.geoAccuracy
        }));
    }

    list = ich.TemplateShowNearMarks_ListItem();
    listStatistics = ich.TemplateShowNearMarks_ListItem();

    len = listItems.length;

    for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
        list.append(listItems[iCpt]);
    }

    listStatistics.append(ich.TemplateShowNearMarks_Item({
        name: "Number of contributions around : " + data.properties.nbSansContribution
    }));

    $('#listNearMarks').empty();

    $('#listNearMarks').append(ich.TemplateShowNearMarks_HeaderList({
        title: "Statistics"
    }));

    $('#listNearMarks').append(listStatistics);

    $('#listNearMarks').append(ich.TemplateShowNearMarks_HeaderList({
        title: "Messages left around here"
    }));

    $('#listNearMarks').append(list);

}
