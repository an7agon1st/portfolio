import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import EarthModel from './earth/scene.gltf';
import SalazarModel from './salazar/scene.gltf';

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var mouseX = 0;
var mouseY = 0;

window.addEventListener('mousemove', (e) => {
    e.preventDefault();
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

window.addEventListener('touchmove', function (e) {
    e.preventDefault();
    // console.log(e);
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});

// scene
var scene = new THREE.Scene();

// camera
var fov = 75;
var aspectRatio = windowWidth / windowHeight;
var camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
camera.lookAt(0, 0, 0);

camera.position.z = 130;
camera.position.y = 0;
camera.position.x = 0;

// model earth
var earth;
var gltfLoader = new GLTFLoader();
gltfLoader.load(EarthModel, function (gltf) {
    earth = gltf.scene;
    scene.add(earth);
}, function (e) {
        // console.log(e);
}, function (error) {
    console.error(error);
});




//  renderer
var renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
let div3d = document.querySelector('.model-3d');
div3d.appendChild(renderer.domElement);

// axes helper
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


function animate() {
    requestAnimationFrame(animate);
    // camera.position.z -= 0.00100;
    if (earth) {
        const maxVRotationDiff = 0.02;
        const mouseVPositionPercent = (mouseX / windowWidth) * maxVRotationDiff;
        earth.rotation.y += 0.001 + mouseVPositionPercent;

        const maxHRotationDiff = 0.5;
        const mouseHPositionPercent = ((mouseY - (windowHeight / 2)) / windowHeight) * maxHRotationDiff;
        earth.rotation.x = mouseHPositionPercent;

    }

    renderer.render(scene, camera);
}

animate();