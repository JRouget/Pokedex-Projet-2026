import { initIntro } from './index.ts';
import { chargerPokedex } from './pokedex.ts';
import { changerScene } from './router.ts';
import "./detail.ts";
import "./composants/footer-detail.ts";
import { afficherPanelEquipe } from "./composants/panel.ts";
import { chargerEquipe } from "./detail.ts";

document.addEventListener("DOMContentLoaded", () => {
    initIntro();


    window.addEventListener("team-click", () => {
        const equipe1 = chargerEquipe("equipe1");
        const equipe2 = chargerEquipe("equipe2");
        const equipe3 = chargerEquipe("equipe3");

        afficherPanelEquipe(equipe1, equipe2, equipe3);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            changerScene("scene-liste");
            chargerPokedex(1);
        }
    });
});