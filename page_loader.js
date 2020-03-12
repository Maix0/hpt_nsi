"use strict";
// Le code a été écrit en TypeScript, un language qui est ensuite compilé en Javascript.
// Il rajoute des fonctionalité comme le typage de variable/arguments et permet le support d'ancien naviateur.
// Le code source sera surement un peut differant mais restera tres similaire. Les fichiers source en typescript sont ecris dans des 
// fichier .ts, puis transcompiler en javascript dans des fichier avec le meme nom dans des fichier en .js
// La fonction addPage permet de rajouter un lien dans la navbar a droite de l'écran
// Cela va generer le code HTML requis avec les information donnée
// et ensuite le rajouter a la fin du code existant dans une balise avec la classe "navbar-nav"
function addPage(link, icon, title) {
    let html = `<li class="nav-item" data-page="${link}"><a href="#" class="nav-link" ><i class="material-icons">${icon}</i><span class="link-text">${title}</span></a></li>`;
    document.querySelector(".navbar-nav").innerHTML += html;
}
// la constante "pages" permet de definir les liens qui seront afficher dans la navbar
// La fonction "main" va parcourire tous les elements de cette liste, lancer la fonction addPage()
const pages = [{
        link: "./pages/accueil.html",
        icon: "home",
        title: "Accueil"
    }, {
        link: "./pages/apps.html",
        icon: "build",
        title: "Apps"
    }, {
        link: "./pages/gallery.html",
        icon: "photo_library",
        title: "Gallery"
    }, {
        link: "./pages/maze.html",
        icon: "games",
        title: "Game"
    }];
// Une referance a la balise <iframe> qui a une classe "page_viewer"
const iframe = document.querySelector(".page_viewer");
// La fonction main est la fontion qui sera lancée a la fin du chargement de la page
// Appelle la fonction "AddPage()" avec les donnée de chaque element de la liste "pages".
// Apres cela, elle va ajouter un event "onclick" sur tout les elements ajouter, 
// qui va changer la proprité "src" de l'iframe , ce qui va changer la page affichée dans l'<iframe>
function init() {
    // passez a travers tous les elements de la liste "Page" 
    pages.forEach(({ link, icon, title }) => {
        // Lance la foncion addPage() avec les valeurs de l'element de la liste
        addPage(link, icon, title);
    });
    // Recupere une liste de tous les elements qui on la classe "nav-item"
    // Ajoute un eventListener sur l'evenement "click" qui changera la page afficher 
    // quand l'element en question sera cliquer dessu. 
    document.querySelectorAll(".navbar-nav .nav-item").forEach(el => {
        el.addEventListener("click", function () {
            iframe.src = this.dataset.page;
            clearActive();
            el.classList.add("active");
        });
    });
    // Emule un click sur l'element "accueil" de la navbar
    document.querySelector(`.navbar-nav .nav-item[data-page="${pages[0].link}"]`).click();
}
function clearActive() {
    document.querySelectorAll(".navbar-nav .nav-item").forEach(el => {
        el.classList.remove("active");
    });
}
// Lorsque l'iframe a fini de charger la page, change le titre de la page avec le titre du document de l'iframe
iframe.addEventListener("load", function (e) {
    document.title = "HPT - " + e.explicitOriginalTarget.contentDocument.title;
});
init();
