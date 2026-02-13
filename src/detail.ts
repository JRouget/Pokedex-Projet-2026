import { changerScene } from './router.ts';
import './composants/footer-detail.ts';

export function chargerEquipe(nom: string): number[] { // initialisation des équipes, [] si vide, ou alors avec les éléments.
    const data = localStorage.getItem(nom);
    return data ? JSON.parse(data) : [];
}

let tableauEquipe1: number[] = chargerEquipe("equipe1");
let tableauEquipe2: number[] = chargerEquipe("equipe2");
let tableauEquipe3: number[] = chargerEquipe("equipe3");


export async function chargerDetails(id: number) {
    if (!id) {
        window.location.href = "index.html";
        return;
    }
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) // Refacto : à mettre dans une fonction
        const pokemon = await response.json();

        const container = document.getElementById("pokemon-detail");
        if (!container) { // évite le cas null
            return;
        }
        const types = pokemon.types.map((t: { type: { name: any; }; }) => t.type.name).join(', ');
        const bio = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`); // refacto : à mettre dans une fonction
        const bioData = await bio.json();
        const spriteNormal = pokemon.sprites.front_default;
        const spriteShiny = pokemon.sprites.front_shiny;
        
        const evoRequete = await fetch(bioData.evolution_chain.url);
        const evoData = await evoRequete.json();
        
        let evolutionsHtml = '';
        let etapeEvo = evoData.chain;

        while (etapeEvo) {
            const nomEvo = etapeEvo.species.name;
            const idEvo = etapeEvo.species.url.split('/')[6]; 
            const imgEvo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idEvo}.png`;

            evolutionsHtml += `
                <div class="evo-item">
                    <img src="${imgEvo}" alt="${nomEvo}">
                    <span>${nomEvo}</span>
                </div>
            `;

            etapeEvo = etapeEvo.evolves_to[0]; 
            
            if (etapeEvo) { 
                evolutionsHtml += `<div class="evo-fleche">→</div>`;
            }
        }


        container.innerHTML = `
        <link rel="stylesheet" href="style/card-style.css" />
            <div class="details-container">
                <div class="pokemon-imgStats">
                    <article class="pokemon-image">
                        <button id="play-cri" class="btn-cri">
                            <img id="img-pokemon" src="${spriteNormal}" alt="${pokemon.name}">
                        </button>
                    </article>
                    
                    <div id="info" class="scene active">
                        <aside class="pokemon-info">
                            <h1 class="info-title">${pokemon.name.toUpperCase()}</h1>
                            <p><strong>N° :</strong> ${pokemon.id}</p>
                            <p><strong>Types :</strong> ${types}</p>
                            <p><strong>Poids :</strong> ${pokemon.weight / 10} kg</p>
                            <p><strong>Taille :</strong> ${pokemon.height / 10} m</p>
                            <button id="btn-shiny" class="btn-shiny">Shiny</button>
                            <select id="select-equipe" class="btn-shiny">
                                <option value="1">Equipe 1</option>
                                <option value="2">Equipe 2</option>
                                <option value="3">Equipe 3</option>
                            </select>
                            <button id="btn-equipe" class="btn-shiny">Ajouter à l'équipe</button>
                        </aside>
                    </div>
                    <div id="evolutions" class="scene">
                        <aside class="pokemon-info">
                            <h2 class="evolution-title">Évolutions</h2>
                            
                            <div class="evolution-chain">
                                ${evolutionsHtml}
                            </div>
                            
                        </aside>
                    </div>
                    <div id="stats" class="scene">
                    <aside class="pokemon-info">
                        <h2 class="stats-title">Statistiques</h2>
                        <ul class="stats-list">
                                ${pokemon.stats.map((s: any) => `
                                    <li class="stat-item">
                                        <span class="stat-nom">${s.stat.name}</span>
                                        <span class="stat-valeur">${s.base_stat}</span>
                                        <div class="stat-barre-fond">
                                            <div class="stat-barre-remplissage" style="width: ${s.base_stat}%;"></div>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </aside>
                    </div>
                </div>
                <article class="pokemon-bio">
                <h2 class="bio-title">Biographie</h2>
                <p>${bioData.flavor_text_entries.find((entry: { language: { name: string; }; }) => entry.language.name === "fr").flavor_text.replace(/[\n\f]/g, ' ')}</p>
                </article>
            </div>

            <footer-detail></footer-detail>
            `;



        const footerComponent = container.querySelector('footer-detail');

        footerComponent?.addEventListener("tab-change", (e: any) => {
            const cibleId = e.detail.targetScene; 
            const scenes = container.querySelectorAll('.scene');

            scenes.forEach(scene => scene.classList.remove('active'));

            const sceneAAfficher = container.querySelector(`#${cibleId}`);
            if (sceneAAfficher) {
                sceneAAfficher.classList.add('active');
            }
        });

        footerComponent?.addEventListener("team-click", () => {
            afficherPanelEquipe();
        });

        const btnShiny = document.getElementById("btn-shiny");
        const imgPokemon = document.getElementById("img-pokemon") as HTMLImageElement;
        let isShiny = false;

        btnShiny?.addEventListener("click", () => {
            isShiny = !isShiny;
            imgPokemon.src = isShiny ? spriteShiny : spriteNormal;
        });
        const boutonCri = document.getElementById("play-cri");
        const cries = pokemon.cries.latest;

        boutonCri?.addEventListener("click", () => {
            const audio = new Audio(cries);
            audio.play();
        });
        const btnEquipe = document.getElementById("btn-equipe");
        const selectEquipe = document.getElementById("select-equipe") as HTMLSelectElement;
        btnEquipe?.addEventListener("click", () => {
            const choix = selectEquipe.value;
            let tableauEquipe: number[] = [];

            if (choix == "1") {
                tableauEquipe = tableauEquipe1;
            }
            if (choix == "2") {
                tableauEquipe = tableauEquipe2;
            }
            if (choix == "3") {
                tableauEquipe = tableauEquipe3;
            }
            if (tableauEquipe.length >= 6) {
                alert("Cette équipe est déjà complète");
                return;
            }
            tableauEquipe.push(pokemon.id);

            alert(`Pokémon ajouté à l'équipe ${choix}`);

            localStorage.setItem('equipe1', JSON.stringify(tableauEquipe1));
            //remove
            console.log(tableauEquipe1);

            localStorage.setItem('equipe2', JSON.stringify(tableauEquipe2));
            console.log(tableauEquipe2);

            localStorage.setItem('equipe3', JSON.stringify(tableauEquipe3));
            console.log(tableauEquipe3);


            afficherPanelEquipe();

        });
        afficherPagination(id)
    } catch (error) {
        console.error(error);
    }
}

function afficherPanelEquipe() {
    const panel = document.getElementById("team-panel");
    if (!panel) return;

    panel.innerHTML = `
    <h2 class="team-title">Equipes</h2>
    <div class="team-list">
        <h3>Equipe 1</h3>
        <p>${tableauEquipe1.length ? tableauEquipe1.map(id => `<span>#${id}</span>`).join("") : "Vide"}</p>
    </div>
    <div class="team-list">
        <h3>Equipe 2</h3>
        <p>${tableauEquipe2.length ? tableauEquipe2.map(id => `<span>#${id}</span>`).join("") : "Vide"}</p>
    </div>
    <div class="team-list">
        <h3>Equipe 3</h3>
        <p>${tableauEquipe3.length ? tableauEquipe3.map(id => `<span>#${id}</span>`).join("") : "Vide"}</p>
    </div>
    <button id="close-team-panel" class="btn-shinny">Fermer</button>
    `;

    panel.classList.remove("hidden");
    panel.classList.add("visible");

    document.getElementById("close-team-panel")?.addEventListener("click", () => {
        panel.classList.remove("visible");
        panel.classList.add("hidden");
    });
}


function afficherPagination(currentId: number) {
    const footerContainer = document.getElementById("detail-footer-container");

    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="detail-footer" style="background: linear-gradient(to bottom, #2a2a2a 0%, #000 100%); border-top: 4px solid #555; height: 48px; display: flex; justify-content: space-between; align-items: center; padding: 0 10px; font-family: 'Chakra Petch', sans-serif; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 1000;">
            <div style="display: flex; gap: 10px;">
                <button id="btn-detail-prev" style="background:none; border:none; color:#666; font-size:28px; font-weight:900; cursor:pointer; ${currentId <= 1 ? 'opacity:0.3; cursor:default;' : ''}">«</button>
            </div>

            <button id="btn-team" style="background:#1a1a1a; border:1px solid #444; color:white; padding:4px 8px; cursor:pointer;">
                TEAM
            </button>


            <div style="display: flex; gap: 10px; align-items:center;">
                <button id="btn-detail-next" style="background:none; border:none; color:#666; font-size:28px; font-weight:900; cursor:pointer;">»</button>
                
                <button id="btn-detail-esc" style="display:flex; align-items:center; gap:5px; background:#1a1a1a; border:1px solid #444; color:white; padding:4px 8px; cursor:pointer;">
                    <span style="color:#3399ff; font-weight:900; transform:rotate(90deg); display:inline-block;">U</span> ESC
                </button>
            </div>
        </footer>
    `;

    document.getElementById("btn-detail-prev")?.addEventListener("click", () => {
        if (currentId > 1) {
            chargerDetails(currentId - 1);
        }
    });

    document.getElementById("btn-detail-next")?.addEventListener("click", () => {
        chargerDetails(currentId + 1);
    });

    document.getElementById("btn-detail-esc")?.addEventListener("click", () => {
        changerScene("scene-liste");
    });

    document.getElementById("btn-team")?.addEventListener("click", () => {
        afficherPanelEquipe();
    })
}

// window.afficherPanelEquipe = afficherPanelEquipe;

