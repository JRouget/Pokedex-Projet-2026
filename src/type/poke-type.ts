export interface APINamedRessource{
    name: string;
    url: string;
}

export interface APIListResponse{
    count: number;
    previous: string | null;
    next: string | null;

    results: APINamedRessource[];
}

export interface PokemonImage {
    front_default: string;
    other?: {
        "official-artwork":{
            front_default: string;
        };
        home?:{
            front_default: string;
        }
    };
    showdown?: {
        front_default: string;
    };
}

export interface PokemonType {
    slot: number;
    type: APINamedRessource;
}

export interface PokemonStat {
    base_stat: number;
    stat: APINamedRessource;
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: APINamedRessource;
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}

export interface PokemonMove {
    move: APINamedRessource;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;

    image: PokemonImage;
    types: PokemonType[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    moves: PokemonMove[];
    cries: PokemonCries;
}

export interface ITaskPokemonResult{
    tasks: ITask[];
    totalCount: number;
}

export interface IProjectPokemonResult{
    projects: IProject[];
    totalCount: number;
}