import './composants/footer-detail.ts';
import { afficherPanelEquipe } from './composants/panel.ts';

export function chargerEquipe(nom: string): number[] {
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
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();

        const container = document.getElementById("pokemon-detail");
        if (!container) return;

        const types = pokemon.types.map((t: { type: { name: any } }) => t.type.name).join(', ');

        const bio = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const bioData = await bio.json();

        const spriteNormal = pokemon.sprites.front_default;
        const spriteShiny = pokemon.sprites.front_shiny;

        const bioEntry = bioData.flavor_text_entries.find(
            (entry: { language: { name: string } }) => entry.language.name === "fr"
        );

        const bioText = bioEntry
            ? bioEntry.flavor_text.replace(/[\n\f]/g, ' ')
            : "Aucune biographie disponible.";

        container.innerHTML = `
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

                    <div class="scene">
                        <h2 class="evolution-title">Évolutions</h2>
                        <div class="evolution-chain"></div>
                    </div>

                    <div id="stats" class="scene">
                        <aside class="pokemon-info">
                            <h2 class="stats-title">Statistiques</h2>
                            <ol class="stats-list">
                                <li>bonjour</li>
                            </ol>
                        </aside>
                    </div>
                </div>

                <article class="pokemon-bio">
                    <h2 class="bio-title">Biographie</h2>
                    <p>${bioText}</p>
                </article>
            </div>

            <footer-detail></footer-detail>
        `;

        // --- SHINY ---
        const btnShiny = document.getElementById("btn-shiny");
        const imgPokemon = document.getElementById("img-pokemon") as HTMLImageElement;
        let isShiny = false;

        btnShiny?.addEventListener("click", () => {
            isShiny = !isShiny;
            imgPokemon.src = isShiny ? spriteShiny : spriteNormal;
        });

        // --- CRI ---
        const boutonCri = document.getElementById("play-cri");
        const cries = pokemon.cries.latest;

        boutonCri?.addEventListener("click", () => {
            const audio = new Audio(cries);
            audio.currentTime = 0;
            audio.play();
        });

        // --- AJOUT ÉQUIPE ---
        const btnEquipe = document.getElementById("btn-equipe");
        const selectEquipe = document.getElementById("select-equipe") as HTMLSelectElement;

        btnEquipe?.addEventListener("click", () => {
            const choix = selectEquipe.value;
            let tableauEquipe: number[];

            if (choix === "1") tableauEquipe = tableauEquipe1;
            else if (choix === "2") tableauEquipe = tableauEquipe2;
            else tableauEquipe = tableauEquipe3;

            if (tableauEquipe.length >= 6) {
                alert("Cette équipe est déjà complète");
                return;
            }

            tableauEquipe.push(pokemon.id);
            localStorage.setItem(`equipe${choix}`, JSON.stringify(tableauEquipe));

            alert(`Pokémon ajouté à l'équipe ${choix}`);
        });

        document.addEventListener("team-click", () => {
            afficherPanelEquipe(tableauEquipe1, tableauEquipe2, tableauEquipe3);
        });

    } catch (error) {
        console.error(error);
    }
}