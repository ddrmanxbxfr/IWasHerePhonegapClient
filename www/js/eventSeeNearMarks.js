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
    } else {
        stopGeolocating();
        startGeolocating();
    }
}

function parseGeoResultsSeeNearMarks(position) {
    "use strict";
    document.getElementById('gpsAccuracy').textContent = position.coords.accuracy;
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
            listOfPicturesToFetch = [];
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

                if (data.features[iCpt].properties.pictureid !== undefined) {
                    listOfPicturesToFetch.push(data.features[iCpt].properties.pictureid);
                }
            }

            list = ich.TemplateShowNearMarks_ListItem();
            listStatistics = ich.TemplateShowNearMarks_ListItem();

            len = listItems.length;

            for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
                list.append(listItems[iCpt]);
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


        function parsePictures(data) {
            "use strict";
            var list, listItems, len, iCpt;
            len = data.length;
            listItems = [];
            var eleToIns;
            for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
                eleToIns = ich.TemplateShowNearMarks_ImageItem();
                eleToIns[0].children[0].id = data[iCpt];
                eleToIns[0].children[0].style.width = "100px";
                eleToIns[0].children[0].style.height = "100px";
                listItems.push(eleToIns);
            }

            list = ich.TemplateShowNearMarks_ListItem();

            len = listItems.length;

            for (iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
                list.append(listItems[iCpt]);
            }

            $('#listNearMarks').append(ich.TemplateShowNearMarks_HeaderList({
                title: "Pictures"
            }));

            $('#listNearMarks').append(list);
        }


        document.getElementById('loadingModal').textContent = "Oiling the crank.";
        var remainingPicturesToFetch = parseApiResults(data);

        document.getElementById('loadingModal').textContent = "Drinking beer with bender.";
        var len = remainingPicturesToFetch.length;
        var imgDataToAdd = [];
        for (var iCpt = 0; iCpt < len; iCpt = iCpt + 1) {
            $.ajax({
                type: 'GET',
                url: getApiUrl() + 'picture' + '/' + remainingPicturesToFetch[iCpt],
                async: true, // TODO Remettre a true
                success: function (data) {
                  document.getElementById(remainingPicturesToFetch[iCpt]).src = data;
                },
                error: function (xhr, type) {
                    console.log('fetch image error during ajax');
                }
            })
        }

        parsePictures(remainingPicturesToFetch);
        imgDataToAdd = undefined;
        addClass(document.getElementById('overlay_loadingDataAndGeoLocating'), 'off');
    });
}
