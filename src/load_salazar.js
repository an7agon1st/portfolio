import SalazarModel from './salazar/scene.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

var salazar;
const degreeOfVisionHorizontal = Math.PI / 4;
const degreeOfVisionVertical = Math.PI / 4;

function loadSalazar(scene) {
    // model salazar
    var gltfLoader = new GLTFLoader();
    gltfLoader.load(SalazarModel, function (gltf) {
        salazar = gltf.scene;
        salazar.scale.set(30, 30, 30);
        scene.add(salazar);
    }, function (progress) {
    }, function (error) {
        console.error(error);
    });
}

function addSalazarLight(scene) {

    // Light
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(50, 100, 50);
    spotLight.castShadow = true;
    spotLight.intensity = 10.0;

    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.mapSize.width = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

    var spotLightAnother = new THREE.SpotLight(0xffffff);
    spotLightAnother.position.set(50, 0, 50);
    spotLightAnother.castShadow = true;
    spotLightAnother.intensity = 6.0;

    spotLightAnother.shadow.mapSize.height = 1024;
    spotLightAnother.shadow.mapSize.width = 1024;

    spotLightAnother.shadow.camera.near = 500;
    spotLightAnother.shadow.camera.far = 4000;
    spotLightAnother.shadow.camera.fov = 30;

    spotLightAnother.position.set(-80, 100, 50);
    scene.add(spotLightAnother);
}

function animateOnMouse(mouseX, mouseY, windowWidth, windowHeight) {
    if (salazar) {
        const percentH = ((mouseX - (windowWidth / 2)) / windowWidth);
        const percentV = ((mouseY - (windowHeight / 2)) / windowHeight) + 0.78;
        salazar.rotation.y = percentH * degreeOfVisionHorizontal;
        salazar.rotation.x = percentV * degreeOfVisionVertical;
        // console.log(model.rotation.y);
    }
}

export { loadSalazar, addSalazarLight, animateOnMouse, salazar };
