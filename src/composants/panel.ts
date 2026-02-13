export function afficherPanelEquipe(...equipes: Array<number>[]) {
    const panel = document.getElementById("team-panel");
    if (!panel) return;

    const htmlEquipes = equipes
        .map((equipe, index) => `
            <div class="team-list">
                <h3>Équipe ${index + 1}</h3>
                <p>${equipe.length ? equipe.map(id => `<span>#${id}</span>`).join("") : "Vide"}</p>
            </div>
        `)
        .join("");

    panel.innerHTML = `
        <h2 class="team-title">Équipes</h2>
        ${htmlEquipes}
        <button id="close-team-panel" class="btn-shiny">Fermer</button>
    `;

    panel.classList.remove("hidden");
    panel.classList.add("visible");

    document.getElementById("close-team-panel")?.addEventListener("click", () => {
        panel.classList.remove("visible");
        panel.classList.add("hidden");
    });
}