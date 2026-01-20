import type {Pokemon} from "../type/poke-type";

export async function pokeApiFetcher(identificator: string | number) : Promise<Pokemon | null> {
    try {
        const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${identificator}`);
        return await reponse.json() as Pokemon;
    } catch (error) {
        console.error(error);
        return null;
    }
}
