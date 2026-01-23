
import { getListPokemons } from './service/specifyAPI'

type LitePokemon = { name: string; url: string; };


let fullRepository: LitePokemon[] = [];
let currentList: LitePokemon[] = [];


let pageNumber = 1;
let pkmPerPage = 20;

async function affichage() {
    try {
        const offset = (pageNumber - 1) * pkmPerPage
        const response = await getListPokemons(pkmPerPage, offset);

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
  
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&display=swap');

  .pokedex-footer {

    background: linear-gradient(to bottom, #2a2a2a 0%, #111 20%, #000 100%);
    border-top: 4px solid #555; 
    height: 48px;
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 0 5px;
    font-family: 'Chakra Petch', sans-serif; 
    color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.5);
  }

  .footer-left {
    display: flex;
    gap: 8px; 
    padding-left: 5px;
  }


  .ds-button {
    background-color: #222;
    color: #ccc;
    border: none;
    padding: 5px 10px 5px 15px; 
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    text-transform: uppercase;
    font-family: inherit;
    position: relative;
    

    clip-path: polygon(
        10px 0, 
        100% 0, 
        100% 100%, 
        10px 100%, 
        0 50%
    );
    
    
    filter: drop-shadow(1px 1px 0px #777) drop-shadow(-1px -1px 0px #777);
    margin-left: 5px;
    transition: transform 0.1s, background-color 0.2s;
  }

  .ds-button:hover {
    background-color: #333;
    color: white;
    transform: scale(1.05);
  }


  .ds-button .icon {
    font-size: 12px;
    opacity: 0.7;
  }

  #search-input::placeholder {
      color: #777;
      font-size: 12px;
  }

  .footer-right {
    display: flex;
    align-items: center;
    gap: 12px; 
    padding-right: 10px;
  }

  
  #page-display {
    font-size: 14px;
    color: #aaa;
    font-weight: bold;
    background: #000;
    padding: 2px 6px;
    border-radius: 2px;
    border: 1px solid #333;
  }

  
  .nav-arrow {
    color: #999; 
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 22px; 
    font-weight: 900;
    letter-spacing: -3px; 
    font-family: monospace;
    padding: 0;
    text-shadow: 1px 1px 0 #000;
  }
  .nav-arrow:hover {
      color: white;
  }

  
  .nav-cross {
    color: #ff3333; 
    font-size: 24px;
    font-weight: 900;
    cursor: pointer;
    font-family: sans-serif; 
    text-shadow: 2px 2px 0px #000; 
    line-height: 1;
  }
  .nav-cross:hover {
      color: #ff6666;
  }



  .nav-return {
    color: #3399ff; 
    font-size: 26px;
    font-weight: 900;
    cursor: pointer;
    font-family: sans-serif;
    display: inline-block;
    transform: rotate(90deg); 
    text-shadow: 2px 2px 0px #000;
    line-height: 1;
    position: relative;
    top: 1px;
  }
  
  
.nav-return::after {
    content: '';
    position: absolute;
    top: -5px;       
    right: 0px;
    transform: rotate(180deg);
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid #3399ff; 
}
  
  .nav-return:hover {
      color: #66b2ff;
  }
  </style>

</footer>
`


    data?.results.forEach((pokemon, index) => {
        console.log(pokemon.name);
        const id = offset + index + 1;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

    displayHTML += `
            <a href="../html/detail.html?id=${id}"><div class="carte">
                <img src="${image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            </div></a>
        `;
});

container.innerHTML = displayHTML;

document.getElementById("btn-prev")?.addEventListener("click", () => { previousPage() })
document.getElementById("btn-next")?.addEventListener("click", () => { nextPage() })
}

async function previousPage() {
    if (pageNumber > 1) {
        pageNumber = pageNumber - 1;
        await chargerPokedex();
    }
}

async function nextPage() {
    pageNumber = pageNumber + 1;
    await chargerPokedex ();
}
