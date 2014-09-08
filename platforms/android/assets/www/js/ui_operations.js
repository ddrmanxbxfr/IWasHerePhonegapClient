function removeClass(documentToWorkOn, className) {
    "use strict";
    if (documentToWorkOn.classList.contains(className)) {
        documentToWorkOn.classList.remove(className);
    }
}

function addClass(documentToWorkOn, className) {
    "use strict";
    if (documentToWorkOn.classList.contains(className) === false) {
        documentToWorkOn.classList.add(className);
    }
}
