import { getListPokemons } from './service/specifyAPI'

type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];
let currentDisplayList: LitePokemon[] = [];

async function affichage () {
    try {
        const response = await getListPokemons();

        if (response && response.results) {
            fullRepository = response.results;
            currentDisplayList = [...fullRepository];

            console.log("Voici la liste brute :", currentDisplayList);

            if (currentDisplayList.length > 0) {
                console.log(`Le premier Pokémon est : ${currentDisplayList[0].name}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

affichage();
