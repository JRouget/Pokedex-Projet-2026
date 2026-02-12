

export async function afficherPanelEquipe(tableauEquipe1: Array<number>, tableauEquipe2: Array<number>, tableauEquipe3: Array<number>){
    const panel = document.getElementById("team-panel");
    if (!panel) return;

    panel.innerHTML = `
    <h2 class="team-title">Equipes</h2>
    <div class="team-list">
        <h3>Equipe 1</h3>
        <p>${tableauEquipe1.length ? tableauEquipe1.map(id=> `<span>#${id}</span>`).join(""): "Vide"}</p>
    </div>
    <div class="team-list">
        <h3>Equipe 2</h3>
        <p>${tableauEquipe2.length ? tableauEquipe2.map(id=> `<span>#${id}</span>`).join(""): "Vide"}</p>
    </div>
    <div class="team-list">
        <h3>Equipe 3</h3>
        <p>${tableauEquipe3.length ? tableauEquipe3.map(id=> `<span>#${id}</span>`).join(""): "Vide"}</p>
    </div>
    <button id="close-team-panel" class="btn-shinny">Fermer</button>
    `;

    panel.classList.remove("hidden");
    panel.classList.add("visible");

    document.getElementById("close-team-panel")?.addEventListener("click", ()=> {
        panel.classList.remove("visible");
        panel.classList.add("hidden");
        
    });
    
    
}