import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import EarthModel from './earth/scene.gltf';

var earth;

function loadEarth(scene) {
    // model earth
    var gltfLoader = new GLTFLoader();
    gltfLoader.load(EarthModel, function (gltf) {
        earth = gltf.scene;
        scene.add(earth);
    }, function (e) {
        // console.log(e);
    }, function (error) {
        console.error(error);
    });
}

function animateOnMouse(mouseX, mouseY, windowWidth, windowHeight) {
    if (earth) {
        // const maxVRotationDiff = 0.02;
        // const mouseVPositionPercent = (mouseX / windowWidth) * maxVRotationDiff;
        earth.rotation.y += 0.005;// + mouseVPositionPercent;

        const maxHRotationDiff = 0.1;
        const mouseHPositionPercent = ((mouseY - (windowHeight / 2)) / windowHeight) * maxHRotationDiff;
        earth.rotation.x = mouseHPositionPercent;
    }
}
export { animateOnMouse, loadEarth };