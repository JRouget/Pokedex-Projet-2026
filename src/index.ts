import { changerScene } from './router.ts';
import { chargerPokedex } from './pokedex.ts';

export function initIntro() {
    function startOS() {
        console.log("Démarrage du système...");

        changerScene("scene-liste");

        chargerPokedex(1);
    }

    document.addEventListener('keydown', (event) => {
        const introVisible = document.getElementById('scene-intro')?.classList.contains('active');
        if (introVisible && (event.key === 'Enter' || event.key === 'Escape')) {
            startOS();
        }
    });

    document.getElementById('scene-intro')?.addEventListener('click', () => {
        startOS();
    });
}