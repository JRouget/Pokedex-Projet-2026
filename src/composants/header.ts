class pokeHeader extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'open' })



    shadow.innerHTML = `
    <header>
        <h1>Pokédex</h1>
    </header>
    <style>
        h1 {
            color: #e2e3e4;
        }
    </style>
    `;
    }
}














window.customElements.define('app-header', pokeHeader)