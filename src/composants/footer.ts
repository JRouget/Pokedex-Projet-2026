class pokeFooter extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })


        shadow.innerHTML = `
    <footer>
    <div id="pokedex-container"></div>

    <div class="pagination-controls" style="text-align: center; margin: 20px;">
        <a href""><button id="btn-prev" class="btn-prev">◀ Précédent</button></a>
        <a href""><button id="btn-next" class="btn-next">Suivant ▶</button></a>
    </div>

    <style>
    footer {
        background-color: #000000;
        text-align: center;
        font-family: 'Arial', sans-serif;
        }
        .btn-prev {
            background-color: #002038;
            color: #e2e3e4;
            }
        .btn-prev:hover {
            background-color: #086890;
            }   
        .btn-next {
            background-color: #002038;
            color: #e2e3e4;I
            }
        .btn-next:hover {
            background-color: #086890;
            }
    </style>
    </footer>
`;
    }
}


window.customElements.define('app-footer', pokeFooter)