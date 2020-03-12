function toggle_text() {
    let el_list = document.querySelectorAll(".toggle_hidden") as NodeListOf< HTMLParagraphElement>;
    el_list.forEach(el => {el.classList.toggle("cacher");console.log})
}