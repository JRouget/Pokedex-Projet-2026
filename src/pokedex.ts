
import { getListPokemons } from './service/specifyAPI'

type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];
let currentList: LitePokemon[] = [];


let pageNumber=1;
let pkmPerPage=20;

async function affichage () {
    try {
        const offset = (pageNumber - 1)*pkmPerPage
        const response = await getListPokemons(pkmPerPage, offset);

        if (response && response.results) {
            fullRepository = response.results;
            currentList = [...fullRepository];

            console.log("Voici la liste brute :", currentList);

            if (currentList.length > 0) {
                console.log(`Le premier Pokémon est : ${currentList[0].name}`);
            }
        }
        return currentList;
    } catch (error) {
        console.error(error);
    }
}

export async function chargerPokedex() {

    const offset = (pageNumber - 1)*pkmPerPage
    const data = await getListPokemons(pkmPerPage, offset);
    const container = document.getElementById("pokedex-container");

    let displayHTML = `
            <button id="btn-prev" class="nav-arrow">« Précédent</button>
            <span id="page-display"> Page 1 </span>
            <button id="btn-next" class="nav-arrow">Suivant »</button>";`

    data?.results.forEach((pokemon, index) => {
        console.log(pokemon.name);
        const id = offset + index + 1;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

        displayHTML += `
            <a href="../html/detail.html?id=${id}"><div class="carte">
                <img src="${image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            </div></a>
        `;
    });

    container.innerHTML = displayHTML;

    document.getElementById("btn-prev")?.addEventListener("click", () => {previousPage()})
    document.getElementById("btn-next")?.addEventListener("click", () => {nextPage()})
}

async function previousPage() {
    if (pageNumber>1){
    pageNumber = pageNumber - 1;
    await chargerPokedex ();
    }
}

async function nextPage() {
    pageNumber = pageNumber + 1;
    await chargerPokedex ();
}

