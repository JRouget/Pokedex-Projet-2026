import { getListPokemons } from './service/specifyAPI'
import { initialiserPagination, genererSelectPages, POKEMONS_PAR_PAGE } from './pagination';

type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];

function afficherPage(page: number) {
    const container = document.getElementById("pokedex-container");
    const start = page * POKEMONS_PAR_PAGE;
    const end = start + POKEMONS_PAR_PAGE;
    const pokemonsPage = fullRepository.slice(start, end);
    let displayHTML = "";

    pokemonsPage.forEach((pokemon) => {
        console.log(pokemon.name);
        const id = fullRepository.indexOf(pokemon) + 1;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

        displayHTML += `
            <a href="../html/detail.html?id=${id}"><div class="carte">
                <img src="${image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            </div></a>
        `;
    });

    if (container) container.innerHTML = displayHTML;
}

export async function chargerPokedex() {
    try {
        const response = await getListPokemons();

        if (response && response.results) {
            fullRepository = response.results;

            console.log("Voici la liste brute :", fullRepository);

            if (fullRepository.length > 0) {
                console.log(`Le premier Pokémon est : ${fullRepository[0].name}`);
            }

            genererSelectPages(fullRepository.length);
            initialiserPagination(afficherPage);
            afficherPage(0);
        }
    } catch (error) {
        console.error(error);
    }
}