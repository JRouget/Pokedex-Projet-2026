class pokeFooter extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })

        shadow.innerHTML = `
<footer class="detail-footer">
    
    <div class="nav-arrows">
        <button id="btn-prev" class="arrow-btn">
            <span class="chevron">«</span>
        </button>
    </div>

    <div class="tabs-group">
        <button class="tech-tab active">
            <span class="tab-text">INFO</span>
        </button>
        <button class="tech-tab">
            <span class="tab-text">EVOLUTIONS</span>
        </button>
        <button class="tech-tab">
            <span class="tab-text">STATS</span>
        </button>
        <button class="tech-tab">
            <span class="tab-text">TEAM</span>
        </button>
    </div>

    <div class="right-controls">
        <button id="btn-next" class="arrow-btn">
            <span class="chevron">»</span>
        </button>

        <a href="../pokedex.html" class="esc-module">
            <span class="u-icon">U</span>
            <span class="esc-text">ESC</span>
        </a>
    </div>

    <style>

.detail-footer {
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

.nav-arrows, .right-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.arrow-btn {
    background: none;
    border: none;
    color: #666;
    font-size: 28px;
    font-weight: 900;
    cursor: pointer;
    line-height: 1;
    padding: 0 5px;
    transition: color 0.2s, transform 0.1s;
    text-shadow: 1px 1px 0 #000;
}

.arrow-btn:hover {
    color: #fff;
    transform: scale(1.1);
}

.tabs-group {
    display: flex;
    align-items: center;
    gap: 2px; 
}

.tech-tab {
    position: relative;
    border: none;
    height: 30px;
    padding: 0 15px;
    font-family: inherit;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
    text-transform: uppercase;
    transform: skewX(-20deg); 
    border: 1px solid #444;
    border-radius: 2px;
    transition: all 0.2s;
    min-width: 60px;
}

.tech-tab .tab-text {
    display: inline-block;
    transform: skewX(20deg); 
}

.tech-tab {
    background: linear-gradient(to bottom, #222, #111);
    color: #888;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
}

.tech-tab:hover {
    border-color: #666;
    color: #ccc;
}

.tech-tab.active {
    background: #e0e0e0;
    color: #111;
    border-color: #fff;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    z-index: 10;
}

.esc-module {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #1a1a1a;
    padding: 4px 10px;
    border: 1px solid #444;
    border-radius: 4px; 
    text-decoration: none;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.8);
    transition: background-color 0.2s;
}

.esc-module:hover {
    background-color: #2a2a2a;
    border-color: #666;
}

.esc-text {
    color: white;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1px;
}

.u-icon {
    color: #3399ff; 
    font-weight: 900;
    font-size: 20px;
    display: inline-block;
    transform: rotate(90deg); 
    position: relative;
    line-height: 1;
    top: 1px; 
    text-shadow: 0 0 2px rgba(51, 153, 255, 0.5); 
}

.u-icon::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -1.5px;
    width: 0; 
    height: 0; 
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #3399ff; 
}

.u-icon::after {
    border: none; 
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #3399ff; 
    transform: rotate(180deg);
    top: 0px;
    right: -1px;
}
    </style>
</footer>
        `

        const url = new URL(window.location.href)
        const idParam = url.searchParams.get('id')
        const currentId = idParam ? parseInt(idParam, 10) : 1

        shadow.getElementById("btn-prev")?.addEventListener("click", () => {
            if (currentId > 1) {
                window.location.href = `?id=${currentId - 1}`
            }
        })

        shadow.getElementById("btn-next")?.addEventListener("click", () => {
            window.location.href = `?id=${currentId + 1}`
        })
    }
}

window.customElements.define('footer-detail', pokeFooter)