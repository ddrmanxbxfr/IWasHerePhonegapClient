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

function showOverlay(overlayName) {
    "use strict";
    var overlayToShow;
    overlayToShow = document.getElementById(overlayName);
    if (overlayToShow.classList.contains('off')) {
        overlayToShow.classList.remove('off');
    }
}

function hideOverlay(overlayName) {
    "use strict";
    var overlayToShow;
    overlayToShow = document.getElementById(overlayName);
    overlayToShow.classList.add('off');
}
