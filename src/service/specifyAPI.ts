import type {APIListResponse} from "../type/poke-type.ts";

export async function getListPokemons (limit : number, offset : number) : Promise<APIListResponse | null> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        return await response.json() as APIListResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function getPokemon () {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000");
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function fetchFiltersList(category: 'type' | 'generation' | 'ability') {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/${category}?limit=1000`);
        const data = await response.json();

        return data.results.sort((a: any, b: any) => {
            return a.name.localeCompare(b.name);
        });
    } catch(error) {
        console.error(error);
        return [];
    }
}

export async function fetchPokemonByFilter(url: string) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.pokemon) {
            return data.pokemon.map((element: any) => element.pokemon);
        } else if (data.pokemon_species) {
            return data.pokemon_species;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}
