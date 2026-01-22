export const POKEMONS_PAR_PAGE = 10;
let pageActuelle = 0;

export function initialiserPagination(auChangementDePage: (nouvellePage: number) => void) {
    const btnAvant = document.querySelector('#btn-precedent');
    const btnApres = document.querySelector('#btn-suivant');
    const menuPages = document.querySelector('#page-select') as HTMLSelectElement | null;

    btnApres?.addEventListener('click', () => {
        pageActuelle++;
        if (menuPages) menuPages.value = pageActuelle.toString();
        auChangementDePage(pageActuelle);
    });

    btnAvant?.addEventListener('click', () => {
        if (pageActuelle > 0) {
            pageActuelle--;
            if (menuPages) menuPages.value = pageActuelle.toString();
            auChangementDePage(pageActuelle);
        }
    });

    menuPages?.addEventListener('change', (e) => {
        pageActuelle = parseInt((e.target as HTMLSelectElement).value);
        auChangementDePage(pageActuelle);
    });
}

export function genererSelectPages(totalPokemons: number) {
    const menuPages = document.querySelector('#page-select') as HTMLSelectElement | null;
    if (menuPages) {
        menuPages.innerHTML = "";
        const nombrePages = Math.ceil(totalPokemons / POKEMONS_PAR_PAGE);
        for (let i = 0; i < nombrePages; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.text = `Page ${i + 1}`;
            menuPages.appendChild(option);
        }
    }
}

export function resetPage() {
    pageActuelle = 0;
    const menuPages = document.querySelector('#page-select') as HTMLSelectElement | null;
    if (menuPages) menuPages.value = "0";
}