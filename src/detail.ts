import { changerScene } from './router.ts';

let tableauEquipe1: number[] = [];
let tableauEquipe2: number[] = [];
let tableauEquipe3: number[] = [];

export async function chargerDetails(id: number) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();

        const bioResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const bioData = await bioResponse.json();
        const description = bioData.flavor_text_entries.find((entry: any) => entry.language.name === "fr")?.flavor_text.replace(/\n|\f/g, ' ') || "Pas de description.";

        const container = document.getElementById("pokemon-detail");
        const footerContainer = document.getElementById("detail-footer-container");

        if (!container || !footerContainer) return;


        const types = pokemon.types.map((t: any) => t.type.name).join(', ');
        const spriteNormal = pokemon.sprites.front_default;
        const spriteShiny = pokemon.sprites.front_shiny;

        container.innerHTML = `
            <div class="details-container" style="padding-bottom: 60px;">
                <div class="pokemon-imgStats">
                    <article class="pokemon-image">
                        <button id="btn-toggle-shiny" style="background:none; border:none; cursor:pointer;">
                            <img id="img-pokemon-detail" src="${spriteNormal}" alt="${pokemon.name}" style="width:200px;">
                        </button>
                    </article>

                    <aside class="pokemon-info">
                        <h1 class="info-title">${pokemon.name.toUpperCase()}</h1>
                        <p><strong>N° :</strong> ${pokemon.id}</p>
                        <p><strong>Types :</strong> ${types}</p>
                        <p><strong>Poids :</strong> ${pokemon.weight / 10} kg</p>
                        <p><strong>Taille :</strong> ${pokemon.height / 10} m</p>
                        
                        <button id="btn-cri" class="ds-button">🔊 Cri</button>
                        
                        <div style="margin-top:10px;">
                            <select id="select-equipe">
                                <option value="1">Equipe 1</option>
                                <option value="2">Equipe 2</option>
                                <option value="3">Equipe 3</option>
                            </select>
                            <button id="btn-equipe">Ajouter</button>
                        </div>
                    </aside>
                </div>
                <article class="pokemon-bio" style="margin-top:20px; border:1px solid #333; padding:10px;">
                    <h3>Biographie</h3>
                    <p>${description}</p>
                </article>
            </div>
        `;

        
        let isShiny = false;
        const imgEl = document.getElementById("img-pokemon-detail") as HTMLImageElement;
        document.getElementById("btn-toggle-shiny")?.addEventListener("click", () => {
            isShiny = !isShiny;
            imgEl.src = isShiny ? spriteShiny : spriteNormal;
        });

        document.getElementById("btn-cri")?.addEventListener("click", () => {
            if(pokemon.cries.latest) new Audio(pokemon.cries.latest).play();
        });

        document.getElementById("btn-equipe")?.addEventListener("click", () => {
            const select = document.getElementById("select-equipe") as HTMLSelectElement;
            const choix = select.value;
            let currentTab = choix === "1" ? tableauEquipe1 : choix === "2" ? tableauEquipe2 : tableauEquipe3;
            
            if (currentTab.length >= 6) alert("Équipe complète !");
            else {
                currentTab.push(pokemon.id);
                alert(`Ajouté à l'équipe ${choix}`);
            }
        });


        footerContainer.innerHTML = `
        <footer class="detail-footer" style="background: linear-gradient(to bottom, #2a2a2a 0%, #000 100%); border-top: 4px solid #555; height: 48px; display: flex; justify-content: space-between; align-items: center; padding: 0 10px; font-family: 'Chakra Petch', sans-serif; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 1000;">
            <div style="display: flex; gap: 10px;">
                <button id="btn-detail-prev" style="background:none; border:none; color:#666; font-size:28px; font-weight:900; cursor:pointer;">«</button>
            </div>

            <div style="display: flex; gap: 2px;">
                <button style="background:#e0e0e0; color:#111; border:none; padding:5px 15px; font-weight:bold; transform:skewX(-20deg);">
                    <span style="display:inline-block; transform:skewX(20deg);">INFO</span>
                </button>
                <button style="background:#222; color:#888; border:1px solid #444; padding:5px 15px; font-weight:bold; transform:skewX(-20deg);">
                    <span style="display:inline-block; transform:skewX(20deg);">STATS</span>
                </button>
            </div>

            <div style="display: flex; gap: 10px; align-items:center;">
                <button id="btn-detail-next" style="background:none; border:none; color:#666; font-size:28px; font-weight:900; cursor:pointer;">»</button>
                
                <button id="btn-detail-esc" style="display:flex; align-items:center; gap:5px; background:#1a1a1a; border:1px solid #444; color:white; padding:4px 8px; cursor:pointer;">
                    <span style="color:#3399ff; font-weight:900; transform:rotate(90deg); display:inline-block;">U</span> ESC
                </button>
            </div>
        </footer>
        `;

        
        document.getElementById("btn-detail-prev")?.addEventListener("click", () => {
            if (id > 1) chargerDetails(id - 1);
        });

        document.getElementById("btn-detail-next")?.addEventListener("click", () => {
            chargerDetails(id + 1);
        });

        document.getElementById("btn-detail-esc")?.addEventListener("click", () => {
            changerScene("scene-liste"); 
        });

    } catch (error) {
        console.error(error);
    }
}