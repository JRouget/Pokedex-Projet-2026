function enterSite() {
    console.log("Accès autorisé...");
    window.location.href = "../pokedex.html";
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        enterSite();
    } else if (event.key === 'Escape') {
        enterSite();
    }
});

document.addEventListener('click', function () {
    enterSite();
});