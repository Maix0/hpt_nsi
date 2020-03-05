"use strict";
function addPage(link, icon, title) {
    let html = `<li class="nav-item" data-page="${link}"><a href="#" class="nav-link" ><i class="material-icons">${icon}</i><span class="link-text">${title}</span></a></li>`;
    document.querySelector(".navbar-nav").innerHTML += html;
}
const pages = [{
        link: "./pages/accueil.html",
        icon: "home",
        title: "Accueil"
    }, {
        link: "./pages/apps.html",
        icon: "build",
        title: "Tuto"
    }];
const iframe = document.querySelector(".page_viewer");
function main() {
    pages.forEach(({ link, icon, title }) => {
        addPage(link, icon, title);
    });
    document.querySelectorAll(".navbar-nav .nav-item").forEach(el => {
        el.addEventListener("click", function () {
            iframe.src = this.dataset.page;
            setTimeout(() => {
                document.querySelector("title").innerText = "HPT - " + iframe.contentWindow.document.querySelector("title").innerText;
            }, 500);
        });
    });
}
main();
