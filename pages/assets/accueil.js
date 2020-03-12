"use strict";
function toggle_text() {
    let el_list = document.querySelectorAll(".toggle_hidden");
    el_list.forEach(el => { el.classList.toggle("cacher"); console.log; });
}
