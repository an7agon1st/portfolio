import * as THREE from 'three';
import * as Salazar from './load_salazar';
import * as Earth from './load_earth';

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var mouseX = 0;
var mouseY = 0;

var salazar;

var showWhich;

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

Salazar.loadSalazar(function (gltf) {
    salazar = gltf.scene;
    salazar.scale.set(22, 22, 22);
    salazar.position.z = - 300;
    salazar.visible = false;
    scene.add(salazar);
});

var lights = Salazar.addSalazarLight(scene);

// Salazar.salazar.visible = false;

Earth.loadEarth(scene);

//  renderer
var renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
let div3d = document.querySelector('.model-3d');
div3d.appendChild(renderer.domElement);

// axes helper
// var axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);


function animate() {

    requestAnimationFrame(animate);
    // camera.position.z -= 0.00100;
    Earth.animateOnMouse(mouseX, mouseY, windowWidth, windowHeight);
    Salazar.animateOnMouse(mouseX, mouseY, windowWidth, windowHeight, salazar);

    if (salazar && camera.position.z > -60) {
        salazar.visible = false;
    }

    if (showWhich == 'salazar')
        moveToSalazar(camera, salazar);
    if (showWhich == 'earth')
        moveToEarth(camera);

    renderer.render(scene, camera);
}

animate();

function moveToSalazar(camera, salazar) {
    if (camera.position.z > -200) {
        if (camera.position.z < -60) {
            salazar.visible = true;
        }
        camera.position.z -= 1.5;
    }
}

function moveToEarth(camera) {
    if (camera.position.z < 130) {
        camera.position.z += 1.5;
    }
}

document.querySelector('.button.salazar').addEventListener('click', function () {
    showWhich = 'salazar';
});

// TODO: fix this
document.querySelector('.button.salazar').addEventListener('mousemove', function (e) {
    mouseX = e.pageX- this.offsetLeft;
    mouseY = e.pageY- this.offsetTop;
});

document.querySelector('.button.earth').addEventListener('click', function () {
    showWhich = 'earth';
    console.info(mouseX, mouseY);

});