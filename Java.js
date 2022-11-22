window.addEventListener("beforeunload", function () {
    document.body.classList.remove("animate-in");
    document.body.classList.add("animate-out");
});
