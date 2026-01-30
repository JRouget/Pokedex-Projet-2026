import { getListPokemons, getAllPokemon } from './service/specifyAPI.ts'; // Vérifie le chemin
import { changerScene } from './router.ts';
import { chargerDetails } from './detail.ts';

type LitePokemon = { name: string; url: string; };

const pkmPerPage = 20;
let globalList: LitePokemon[] = [];

export async function chargerPokedex(pageNumber: number = 1) {
    //Calcule de l'offset pour la pagination sur l'écran princiapl
    //l'offset est l'index de départ pour la pagination
    const offset = (pageNumber - 1) * pkmPerPage;
    //Cela sert à récupérer la liste des pokémons
    const response = await getListPokemons(pkmPerPage, offset);
    //Cela sert à récupérer le conteneur principal du Pokédex
    const container = document.getElementById("pokedex-container");

    if (!container) return;

    //On charge le pokédex pour la première fois si la barre de recherche n'existe pas
    if (!document.getElementById("search-input")) {
        //Injection de la structure HTML
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

        document.getElementById('search-input')?.addEventListener('input', async (e) => { // Actualise la recherche à chaque caractère tapé (input)
            const term = (e.target as HTMLInputElement).value;
            if(!globalList.length) globalList = await getAllPokemon(); // Charge tout si pas fait
            //Recherche dans la liste des pokémons en temps réel
            const results = globalList.filter(p => p.name.includes(term));
            //affichage des résultats filtrés
            renderList(results);
        });

        //bouton pour revenir à la scène d'intro
        document.getElementById('btn-back-intro')?.addEventListener('click', () => {
            changerScene("scene-intro");
        });
    }

    //Seulement si l'Api continet une liste de pokemons
    if (response && response.results) {

        //affiche la liste des pokemons
        renderList(response.results);

        //met à jour l'affichage du numéro de page
        const pageDisplay = document.getElementById("page-display");

        if (pageDisplay) pageDisplay.innerText = pageNumber.toString();

        const btnPrev = document.getElementById("btn-prev-list");
        const btnNext = document.getElementById("btn-next-list");

        //Bouton page précédente
        //Excécution de la commande quand l'utilisatuer click
        if (btnPrev) {
            const newBtn = btnPrev.cloneNode(true);
            btnPrev.parentNode?.replaceChild(newBtn, btnPrev);
            newBtn.addEventListener('click', () => previousPage(pageNumber));
        }

        //Bouton page suivante
        //Excécution de la commande quand l'utilisatuer click
        if (btnNext) {
            const newBtn = btnNext.cloneNode(true);
            btnNext.parentNode?.replaceChild(newBtn, btnNext);
            newBtn.addEventListener('click', () => nextPage(pageNumber));
        }

    }
}

function renderList(list: LitePokemon[]) {
    const listContainer = document.getElementById("list-cards");
    if (!listContainer) return;

    listContainer.innerHTML = "";


    list.slice(0, pkmPerPage).forEach((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;


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

//Charger la page précédente si on n'est pas en dessous de la page 1
async function previousPage(pageNumber: number) {
    if (pageNumber > 1) {
        await chargerPokedex(pageNumber - 1);
    }
}

//Charge la page suivante
async function nextPage(pageNumber: number) {
    await chargerPokedex(pageNumber + 1);
}