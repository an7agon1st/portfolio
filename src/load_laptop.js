import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import EarthModel from './cyberpunk_laptop/scene.gltf';

var laptop;

function loadLaptop(laptopLoad) {
    // model earth
    var gltfLoader = new GLTFLoader();
    gltfLoader.load(EarthModel, laptopLoad, function (e) {
        // console.log(e);
    }, function (error) {
        console.error(error);
    });
}

function loadLaptopLights(scene, lookAt) {
    var light1 = new THREE.SpotLight(0xffffff, 7);
    light1.position.set(30, 10, 100);
    light1.lookAt(...lookAt);

    scene.add(light1);


    var light2 = new THREE.SpotLight(0xffffff, 3);
    light2.position.set(-30, 10, 100);
    light2.lookAt(...lookAt);

    scene.add(light2);

}


export { loadLaptop, loadLaptopLights };