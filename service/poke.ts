javascript import type { Pokemon } from "../type/poke-type";

export async function getListPokemons () : Promise<Pokemon | null> {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0");
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

export async function pokeApiFetcher(identificator: string | number) : Promise<Pokemon | null> {
    try {
        const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificator}`);
        const data = await reponse.json();
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}
