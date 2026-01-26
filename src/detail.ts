let tableauEquipe1: number[] = JSON.parse(localStorage.getItem('team1') ?? "[]");;
let tableauEquipe2: number[] = JSON.parse(localStorage.getItem('team2') ?? "[]");;
let tableauEquipe3: number[] = JSON.parse(localStorage.getItem('team3') ?? "[]");;

async function chargerDetails() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        window.location.href = "index.html";
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();

        const container = document.getElementById("pokemon-detail");

        const types = pokemon.types.map(t => t.type.name).join(', ');

        const bio = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const bioData = await bio.json();

        const spriteNormal = pokemon.sprites.front_default;
        const spriteShiny = pokemon.sprites.front_shiny;

        container.innerHTML = `
            <div class="details-container">
                <div class="pokemon-imgStats">
                    <article class="pokemon-image">
                        <button id="play-cri" class="btn-cri">
                            <img id="img-pokemon" src="${spriteNormal}" alt="${pokemon.name}">
                        </button>
                    </article>

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

                <article class="pokemon-bio">
                    <h2 class="bio-title">Biographie</h2>
                    <p>${bioData.flavor_text_entries.find(entry => entry.language.name === "fr").flavor_text.replace(/\n|\f/g, ' ')}</p>
                </article>
            </div>
        `;

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
            let tableauEquipe: number [] = [];

            if (choix == "1") tableauEquipe = tableauEquipe1;
            if (choix == "2") tableauEquipe = tableauEquipe2;
            if (choix == "3") tableauEquipe = tableauEquipe3;

            if (tableauEquipe.length >= 6) {
                alert("Cette équipe est déjà complète");
                return;
            }

            tableauEquipe.push(pokemon.id);
            alert(`Pokémon ajouté à l'équipe ${choix}`);

            localStorage.setItem('team1', JSON.stringify(tableauEquipe1));
            
            console.log(tableauEquipe1);

            localStorage.setItem('team2', JSON.stringify(tableauEquipe2));
           
            console.log(tableauEquipe2);

            localStorage.setItem('team3', JSON.stringify(tableauEquipe3));
            console.log(tableauEquipe3);
        });

    } catch (error) {
        console.error(error);
    }
}

chargerDetails();