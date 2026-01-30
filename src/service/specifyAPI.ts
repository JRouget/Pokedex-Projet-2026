import type {APIListResponse} from "../type/poke-type.ts";

// prends tous les pokémons à une limite définie et à partir d'un offset (définit par la pagination)
export async function getListPokemons (limit : number, offset : number) : Promise<APIListResponse | null> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        return await response.json() as APIListResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function getAllPokemon () { // récupère tous les pokémon pour les afficher en cas de recherche
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000");
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}
