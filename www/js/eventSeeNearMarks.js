/*global console, onSuccessGeoLoc, onErrorGeoLoc, watchGeoID, isUserGeoLocated, showOverlay, startGeolocating,
stopGeolocating, currentGeoCoords,$, hideOverlay, ich, setupBtnMarkTerritory, updateUiGeoConfirmation, forceCloseSideNav, templateLoaded:true, verifierSiAccuracyEstOk, setupActiveButton, fetchNearMarksFromAPI, getApiUrl, parseApiResults, addClass*/
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
        function parseApiResults(data) {
            "use strict";
            var list, listStatistics, listItems, listOfPicturesToFetch, len, iCpt;
            len = data.features.length;
            listItems = [];
            for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
                if (data.features[iCpt].properties.textNote !== undefined) {
                    listItems.push(ich.TemplateShowNearMarks_Item({
                        name: data.features[iCpt].properties.textNote
                    }));
                } else {
                    listItems.push(ich.TemplateShowNearMarks_Item({
                        name: data.features[iCpt].properties.geoAccuracy
                    }));
                }
            }

            list = ich.TemplateShowNearMarks_ListItem();
            listStatistics = ich.TemplateShowNearMarks_ListItem();

            len = listItems.length;

            for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
                list.append(listItems[iCpt]);
                if (listItems[iCpt].properties.pictureid !== undefined) {
                    listOfPicturesToFetch.append(listItems[iCpt].properties.pictureid);
                }
            }

            listStatistics.append(ich.TemplateShowNearMarks_Item({
                name: "Number of contributions around : " + data.properties.nbSansContributions
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

            return listOfPicturesToFetch;
        }


        document.getElementById('loadingModal').textContent = "Oiling the crank.";
        var remainingPicturesToFetch = parseApiResults(data);

        document.getElementById('loadingModal').textContent = "Drinking beer with bender.";
        var len = remainingPicturesToFetch.length;
        var imgDataToAdd = [];
        for (var iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
            $.ajax({
                type: 'GET',
                url: getApiUrl() + 'picture' + '/' + currentGeoCoords.lat + '/' + currentGeoCoords.lng,
                async: false // TODO Remettre a true
                success: function (data) {
                    imgDataToAdd.push(data);
                },
                error: function (xhr, type) {
                    console.log('fetch image error during ajax');
                }
            })
        }

        addClass(document.getElementById('overlay_loadingDataAndGeoLocating'), 'off');
    });
}
