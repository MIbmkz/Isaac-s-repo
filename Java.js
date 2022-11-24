window.addEventListener("beforeunload", function () {
    document.body.classList.remove("animate-in");
    document.body.classList.add("animate-out");
});

let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}
