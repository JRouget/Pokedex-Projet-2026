import { chargerDetails } from "../detail";

class pokeFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
        <link rel="stylesheet" href="../../style/card-style.css">
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
    </div>

    <div>
        <button id="btn-team" class="tech-tab">
            <span class="tab-text">TEAM</span>
        </button>
    </div>

    <div class="right-controls">
        <button id="btn-next" class="arrow-btn">
            <span class="chevron">»</span>
        </button>
    </div>
</footer>
        `;

        const url = new URL(window.location.href);
        const idParam = url.searchParams.get('id');
        const currentId = idParam ? parseInt(idParam, 10) : 1;

        shadow.getElementById("btn-prev")?.addEventListener("click", () => {
            if (currentId > 1) {
                history.pushState({ id: currentId - 1 }, '', `${window.location.origin}?id=${currentId - 1}`);
                chargerDetails(currentId - 1);
            }
        });

        shadow.getElementById("btn-next")?.addEventListener("click", () => {
            history.pushState({ id: currentId + 1 }, '', `${window.location.origin}?id=${currentId + 1}`);
            chargerDetails(currentId + 1);
        });


        shadow.getElementById("btn-team")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("team-click", { bubbles: true, composed: true}));
        });
    }
}

window.customElements.define('footer-detail', pokeFooter);