import * as THREE from './node_modules/three/src/Three.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const degreeOfVisionHorizontal = Math.PI / 4;
const degreeOfVisionVertical = Math.PI / 4;

let mouseX = windowWidth / 2;
let mouseY = windowHeight / 2;
window.addEventListener('mousemove', function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

window.addEventListener('touchmove', function (e) {
    // console.log(e);
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});

// new scene
var scene = new THREE.Scene();

// new camera
var fieldOfView = 75;
var aspectRatio = windowWidth / windowHeight;
var nearClip = 0.1;
var farClip = 1000;
var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearClip, farClip);
camera.lookAt(0, 0, 0);
// console.log(camera);


// the model
var model;

var salazar = new GLTFLoader();
salazar.load('./model/salazar/scene.gltf', function (gltf) {
    model = gltf.scene;
    model.position.y = 0.8;
    // console.log(model);
    model.scale.set(1.5,1.5,1.5);
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});
// console.log(salazar);

// renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// the cube is added right where the camera is so we move the camera a tiny bit
camera.position.z = 5;
camera.position.y = 0.5;

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



// var helper = new THREE.SpotLightHelper(spotLight);
// scene.add(helper);

// var rectLight = new THREE.RectAreaLight(0xffffff, 1, 50, 50);
// rectLight.position.set(100, 100, -100);
// rectLight.lookAt(0, 0, 0);
// scene.add(rectLight);

// var rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
// scene.add(rectLightHelper);

// now to render the screen
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        const percentH = ((mouseX - (windowWidth / 2)) / windowWidth);
        const percentV = ((mouseY - (windowHeight / 2)) / windowHeight) + 0.78;
        model.rotation.y = percentH * degreeOfVisionHorizontal;
        model.rotation.x = percentV * degreeOfVisionVertical;
        // console.log(model.rotation.y);
    }

    renderer.render(scene, camera);
}

animate();
