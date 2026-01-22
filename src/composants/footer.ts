class pokeFooter extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })


        shadow.innerHTML = `
<footer class="pokedex-footer">
  
  <div class="footer-left">
    <button class="ds-button">
      <span class="icon">🔍</span>
      <form action="" method="get">
        <input type="search" name="search" placeholder="Enter a name . . ." required>
        <button type="submit">Research</button>
      </form>
    </button>
    <button class="ds-button">
      <span class="icon">📄</span> SELECT
    </button>
  </div>

  <div class="footer-right">
    <span class="nav-arrow">«</span>
    <span class="nav-arrow">»</span>
    <a href="../index.html"><span class="nav-cross">✖</span></a>
    <a href="#" onclick="history.back(); return false;"><span class="nav-return">U</span></a>
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
  gap: 15px; /* Espace entre les icônes */
  font-size: 20px;
  font-weight: bold;
}

.nav-arrow {
  color: #aaa; /* Gris clair pour les flèches */
  cursor: pointer;
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

</footer>
`
    }
}


window.customElements.define('app-footer', pokeFooter)