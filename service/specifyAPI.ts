import type { APIListResponse } from "../type/poke-type";

export async function getListPokemons () : Promise<APIListResponse | null> {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0");
        return await response.json() as APIListResponse;
    } catch (error) {
        console.error(error);
    }
}