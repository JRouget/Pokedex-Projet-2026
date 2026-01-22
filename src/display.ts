import { getListPokemons } from './service/specifyAPI'


type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];
let currentDisplayList: LitePokemon[] = [];

async function affichage () {
    try {
        const limit = 15;
        const offset = 0;
        const response = await getListPokemons(limit, offset);

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




//const prev = page === 1 ? undefined : page - 1;
//const next = page === pages.length ? undefined : page + 1;