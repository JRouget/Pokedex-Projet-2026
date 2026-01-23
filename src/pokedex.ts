import { getListPokemons } from './service/specifyAPI'

type LitePokemon = { name: string; url: string; };

let fullRepository: LitePokemon[] = [];
let currentList: LitePokemon[] = [];
let pkmPerPage = 20;

function renderList(list: LitePokemon[]) {
    const listContainer = document.getElementById("list-cards");
    if (!listContainer) return;

<<<<<<< HEAD
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

    const offset = (pageNumber - 1) * pkmPerPage
    const data = await getListPokemons( pkmPerPage, offset);
    const container = document.getElementById("pokedex-container");

    let displayHTML = `
    <footer class="pokedex-footer">
  
    <div class="footer-left">
        <button class="ds-button">
            <span class="icon">🔍</span>
            <input type="text" id="search-input" placeholder="SEARCH" style="padding: 0; width: 150px; background:transparent; border:none; color:white; font-family:inherit; font-weight:bold; outline:none; text-transform: uppercase;">
        </button>
        <button class="ds-button">
            <span class="icon">📄</span> TEAM
        </button>
    </div>

    <div class="footer-right">
            <button id="btn-prev" class="nav-arrow">«</button>
            
            <span id="page-display"> 1 </span>
            
            <button id="btn-next" class="nav-arrow">»</button>

            <a href="../index.html"><span class="nav-cross">✖</span></a>
            
            <a href="#" id="btn-back"><span class="nav-return">U</span></a>
    </div>

  <style>
  
</footer>
`


    data?.results.forEach((pokemon, index) => {
        console.log(pokemon.name);
        const id = offset + index + 1;
    let displayHTML = ``;
    list.forEach((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();

        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

        displayHTML += `
                <a href="../html/detail.html?id=${id}"><div class="carte">
                    <img src="${image}" alt="${pokemon.name}">
                    <h3>${pokemon.name}</h3>
                </div></a>
            `;
    });
    listContainer.innerHTML = displayHTML;
}

export default async function chargerPokedex(pageNumber: number = 1) {
    const offset = (pageNumber - 1) * pkmPerPage;
    const response = await getListPokemons(pkmPerPage, offset);
    const container = document.getElementById("pokedex-container");

    if (!container) return;

    if (!document.getElementById("search-input")) {
        container.innerHTML = `
        <footer class="pokedex-footer">
            <div class="footer-left">
                <button class="ds-button">
                    <span class="icon">🔍</span>
                    <input type="text" id="search-input" placeholder="SEARCH"">
                </button>
                <button class="ds-button">
                    <span class="icon">📄</span> TEAM
                </button>
            </div>
            <div class="footer-right">
                    <button id="btn-prev" class="nav-arrow">«</button>
                    <span id="page-display"> 1 </span>
                    <button id="btn-next" class="nav-arrow">»</button>
                    <a href="../index.html"><span class="nav-cross">✖</span></a>
                    <a href="#" id="btn-back"><span class="nav-return">U</span></a>
            </div>
        </footer>
        <div id="list-cards"></div>
        `;

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            const term = (e.target as HTMLInputElement).value.toLowerCase();
            currentList = fullRepository.filter(p => p.name.toLowerCase().includes(term));
            renderList(currentList);
        });
    }

    if (response && response.results) {
        fullRepository = response.results;
        currentList = fullRepository;

        renderList(currentList);

        const pageDisplay = document.getElementById("page-display");
        if (pageDisplay) pageDisplay.innerText = pageNumber.toString();

        const btnPrev = document.getElementById("btn-prev");
        if (btnPrev) btnPrev.onclick = () => { previousPage(pageNumber) };

        const btnNext = document.getElementById("btn-next");
        if (btnNext) btnNext.onclick = () => { nextPage(pageNumber) };
    }
}

async function previousPage(pageNumber: number) {
    if (pageNumber > 1) {
        await chargerPokedex(pageNumber - 1);
    }
}

async function nextPage(pageNumber: number) {
    await chargerPokedex(pageNumber + 1);
}