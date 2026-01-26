
import { getListPokemons, getPokemon } from './service/specifyAPI.ts'; // Vérifie le chemin
import { changerScene } from './router.ts';
import { chargerDetails } from './detail.ts';

type LitePokemon = { name: string; url: string; };

let pkmPerPage = 20;
let globalList: LitePokemon[] = [];


function renderList(list: LitePokemon[]) {
    const listContainer = document.getElementById("list-cards");
    if (!listContainer) return;

    listContainer.innerHTML = ""; 

    
    list.slice(0, pkmPerPage).forEach((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop(); 
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

        
        const card = document.createElement('div');
        card.className = 'carte';
        card.style.cursor = 'pointer'; 
        card.innerHTML = `
            <img src="${image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
        `;

        
        card.addEventListener('click', () => {
            if (id) {
                changerScene("scene-detail");
                chargerDetails(parseInt(id)); 
            }
        });

        listContainer.appendChild(card);
    });
}

export async function chargerPokedex(pageNumber: number = 1) {
    const offset = (pageNumber - 1) * pkmPerPage;
    const response = await getListPokemons(pkmPerPage, offset);
    const container = document.getElementById("pokedex-container");

    if (!container) return;

    
    if (!document.getElementById("search-input")) {
        container.innerHTML = `
        <div id="list-cards" style="display:flex; flex-wrap:wrap; justify-content:center; gap:10px; padding-bottom:60px;"></div>
        
        <footer class="pokedex-footer">
            <div class="footer-left">
                <button class="ds-button">
                    <span class="icon">🔍</span>
                    <input type="text" id="search-input" placeholder="SEARCH">
                </button>
            </div>
            <div class="footer-right">
                    <button id="btn-prev-list" class="nav-arrow">«</button>
                    <span id="page-display"> 1 </span>
                    <button id="btn-next-list" class="nav-arrow">»</button>
                    <span id="btn-back-intro" class="nav-cross" style="cursor:pointer;">✖</span>
            </div>
        </footer>
        `;

        
        document.getElementById('search-input')?.addEventListener('input', async (e) => {
            const term = (e.target as HTMLInputElement).value;
            if(!globalList.length) globalList = await getPokemon(); // Charge tout si pas fait
            const results = globalList.filter(p => p.name.includes(term));
            renderList(results);
        });


        document.getElementById('btn-back-intro')?.addEventListener('click', () => {
            changerScene("scene-intro");
        });
    }

    if (response && response.results) {
        renderList(response.results);


        const pageDisplay = document.getElementById("page-display");
        if (pageDisplay) pageDisplay.innerText = pageNumber.toString();


        const btnPrev = document.getElementById("btn-prev-list");
        const btnNext = document.getElementById("btn-next-list");
        
        if (btnPrev) {
            const newBtn = btnPrev.cloneNode(true);
            btnPrev.parentNode?.replaceChild(newBtn, btnPrev);
            newBtn.addEventListener('click', () => chargerPokedex(pageNumber > 1 ? pageNumber - 1 : 1));
        }
        
        if (btnNext) {
            const newBtn = btnNext.cloneNode(true);
            btnNext.parentNode?.replaceChild(newBtn, btnNext);
            newBtn.addEventListener('click', () => chargerPokedex(pageNumber + 1));
        }
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

//async function teamPokedex(){
  //  await chargerDetails;
//}

