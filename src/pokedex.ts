import { getListPokemons } from './service/specifyAPI'
import { initialiserPagination, genererSelectPages, POKEMONS_PAR_PAGE, resetPage } from './pagination';

type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];
let currentList: LitePokemon[] = [];

function afficherPage(page: number) {
    const container = document.getElementById("pokedex-container");
    const start = page * POKEMONS_PAR_PAGE;
    const end = start + POKEMONS_PAR_PAGE;
    const pokemonsPage = currentList.slice(start, end);
    let displayHTML = "";

    pokemonsPage.forEach((pokemon) => {
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
            currentList = fullRepository;

            const searchInput = document.getElementById('search-input');
            searchInput?.addEventListener('input', (e) => {
                const term = (e.target as HTMLInputElement).value.toLowerCase();
                currentList = fullRepository.filter(p => p.name.toLowerCase().includes(term));
                resetPage();
                genererSelectPages(currentList.length);
                afficherPage(0);
            });

            genererSelectPages(currentList.length);
            initialiserPagination(afficherPage);
            afficherPage(0);
        }
    } catch (error) {
        console.error(error);
    }
}