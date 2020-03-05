const viewer = document.querySelector(".viewer");

const images = ["../maison1.jpg","../maison2.JPG","../maison3.jpg"]
let img_index = 0
let img_index_max = images.length;

function constrain_index() {
    if (img_index < 0) {
        img_index = img_index_max - 1;
    }
    if (img_index >= img_index_max) {
        img_index = 0;
    }
}

function image_next() {
    img_index +=1;
    constrain_index()
}
function image_berfore() {
    img_index -=1;
    constrain_index()
} 

function main() {
    set_viewer();
}

function set_viewer() {
    viewer.src = images[img_index];
}
