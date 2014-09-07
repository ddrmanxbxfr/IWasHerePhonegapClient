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
