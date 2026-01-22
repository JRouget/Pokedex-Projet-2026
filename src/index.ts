function enterSite() {
    console.log("Accès autorisé...");
    window.location.href = "pokedex.html";
}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        enterSite();
    }
});