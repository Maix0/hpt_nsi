"use strict";
// un moyen rapide de modifier l'image
const viewer = document.querySelector(".viewer");
// list d'image a afficher, dans l'ordre
// il faut juste metres les image dans le dossier "images" et metre le nom de l'image dans la liste
// Une image "image1.jpg" sera converti en "../images/image1.jpg", cela permet de noter que le nom des images
const images = ["Maison.jpg", "maison2.jpg"].map(image => `../images/${image}`);
// index actuel && index auquel il faut repartir a 0
let img_index = 0;
let img_index_max = images.length;
// Fait en sorte que l'index ne sorte jamais des limites de la liste
function constrain_index() {
    if (img_index < 0) {
        img_index = img_index_max - 1;
    }
    if (img_index >= img_index_max) {
        img_index = 0;
    }
}
// Change l'index et appele les fonction pour afficher l'image
function image_next() {
    img_index += 1;
    constrain_index();
    set_viewer();
}
// Change l'index et appele les fonction pour afficher l'image
function image_before() {
    img_index -= 1;
    constrain_index();
    set_viewer();
}
function set_viewer() {
    viewer.src = images[img_index];
}
set_viewer();
