"use strict";
function checkRep(valid_id, false_id) {
    let valid = true;
    valid_id.forEach(function (id) {
        if ((!document.getElementById(id)).checked) {
            valid = false;
        }
    });
    false_id.forEach(function (id) {
        if (document.getElementById(id).checked) {
            valid = false;
        }
    });
    return valid;
}
