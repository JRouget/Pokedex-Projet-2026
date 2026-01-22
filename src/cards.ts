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

                container.innerHTML = `
                <article class="pokemon-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
                </article>

                <aside class="pokemon-info">
                    <h1 class="info-title">${pokemon.name.toUpperCase()}</h1>
                    <p><strong>N° :</strong> ${pokemon.id}</p>
                    <p><strong>Types :</strong> ${types}</p>
                    <p><strong>Poids :</strong> ${pokemon.weight / 10} kg</p>
                    <p><strong>Taille :</strong> ${pokemon.height / 10} m</p>
                    <p><strong>Cri :</strong> <button id="play-cri">Écouter le cri</button></p>
                </aside>
                `;

                const boutonCri = document.getElementById("play-cri");
                const cries = pokemon.cries.latest;

                if (boutonCri && cries) {
                boutonCri.addEventListener("click", () => {
                const audio = new Audio(cries);
                audio.play();
            });
        }

            } catch (error) {
                console.error(error);
                document.getElementById("pokemon-detail").innerText = "Erreur : Pokémon introuvable.";
            }
        }
        
        chargerDetails();

        