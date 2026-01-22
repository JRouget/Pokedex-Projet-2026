
import { getListPokemons } from './service/specifyAPI'


type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];
let currentDisplayList: LitePokemon[] = [];

let pageNumber=1;
let pkmPerPage=20;

async function affichage () {
    try {
        const offset = (pageNumber - 1)*pkmPerPage
        const response = await getListPokemons(pkmPerPage, offset);

        if (response && response.results) {
            fullRepository = response.results;
            currentDisplayList = [...fullRepository];

            console.log("Voici la liste brute :", currentDisplayList);

            if (currentDisplayList.length > 0) {
                console.log(`Le premier Pokémon est : ${currentDisplayList[0].name}`);
            }
        }
        return currentDisplayList;
    } catch (error) {
        console.error(error);
    }
}

async function previous() {
    pageNumber = pageNumber - 1;
    await affichage ();
}

async function next() {
    const pagenext = pageNumber + 1;
    await affichage ();
}

export async function chargerPokedex() {

    const data = await getListPokemons();
    const container = document.getElementById("pokedex-container");

    const pokemon = affichage();
    let displayHTML = "";

    data.results.forEach((pokemon, index) => {
        console.log(pokemon.name);
        const id = index + 1;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

        displayHTML += `
            <a href="../html/card.html?id=${id}"><div class="carte">
                <img src="${image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            </div></a>
        `;
    });

    container.innerHTML = displayHTML;
}