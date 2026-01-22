import {chargerPokedex} from '../pokedex.ts';

class pokeFooter extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })


        shadow.innerHTML = `
<footer class="pokedex-footer">
  
  <div class="footer-left">
    <button class="ds-button">
    🔍
      <input type="text" id="search-input" placeholder="Rechercher un Pokémon..." style="padding: 8px; width: 300px;">
    </button>
    <button class="ds-button">
      <span class="icon">📄</span> TEAM BUILDER
    </button>
  </div>

  <div class="footer-right">
            <a href="../index.html"><span class="nav-cross">✖</span></a>
            <a href="#" id="btn-back"><span class="nav-return">U</span></a>
          </div>

  <style>
  .pokedex-footer {
  background-color: #111;
  border-top: 2px solid #555; 
  height: 50px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0 10px;
  font-family: monospace; 
  color: white;
  
  
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}


.footer-left {
  display: flex;
  gap: 10px; 
}

.ds-button {
  background: black;
  border: 2px solid #888; 
  color: #ddd;
  padding: 2px 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  text-transform: uppercase;
  
  
  border-radius: 4px; 
}

.ds-button:hover {
  background-color: #222;
  border-color: white;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 15px; 
  font-size: 20px;
  font-weight: bold;
}

.page-select {
  background-color: black;
  color: white;
  border: 2px solid #888;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}

.nav-arrow {
  color: #aaa; 
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 18px;
}

.nav-square {
  border: 2px solid #aaa;
  width: 12px;
  height: 12px;
  display: inline-block;
}

.nav-cross {
  color: #ff3333; 
  font-size: 24px;
  cursor: pointer;
}


.nav-return {
  color: #3399ff; 
  font-size: 24px;
  transform: rotate(90deg); 
  display: inline-block;
  cursor: pointer;
  font-family: sans-serif; 
}
  </style>

  <script src="../pokedex.ts"></script>

</footer>
`
    }

    
}


window.customElements.define('app-footer', pokeFooter)