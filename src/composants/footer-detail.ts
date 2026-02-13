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
                <button class="tech-tab active" data-target="info">
                    <span class="tab-text">INFO</span>
                </button>
                <button class="tech-tab" data-target="evolutions">
                    <span class="tab-text">EVOLUTIONS</span>
                </button>
                <button class="tech-tab" data-target="stats">
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
                history.pushState({id: currentId-1}, '', `${window.location.origin}?id=${currentId - 1}`);
                chargerDetails(currentId - 1);
            }
        });

        shadow.getElementById("btn-next")?.addEventListener("click", () => {
           history.pushState({id: currentId+1}, '', `${window.location.origin}?id=${currentId + 1}`);
           chargerDetails(currentId + 1);
        });

        shadow.getElementById("btn-team")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("team-click", { bubbles: true, composed: true }));
        });

        // --- NOUVEAU : Gestion des clics sur les onglets ---
        const tabs = shadow.querySelectorAll('.tabs-group .tech-tab');
        tabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                // 1. Gérer l'état visuel "active" dans le footer
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // 2. Récupérer la cible (ex: "stats") et envoyer l'événement au fichier principal
                const target = tab.getAttribute('data-target');
                this.dispatchEvent(new CustomEvent("tab-change", { 
                    bubbles: true, 
                    composed: true, // Très important pour que l'event sorte du Shadow DOM !
                    detail: { targetScene: target } 
                }));
            });
        });
    }
}

window.customElements.define('footer-detail', pokeFooter);