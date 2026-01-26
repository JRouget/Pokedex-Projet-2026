export function changerScene(nomScene: string) {

    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });

    const sceneActive = document.getElementById(nomScene);
    if (sceneActive) {
        sceneActive.classList.add('active');
    }
}