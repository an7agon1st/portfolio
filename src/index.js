import * as THREE from 'three';
// import * as Salazar from './load_salazar';
import * as Earth from './load_earth';
import * as Laptop from './load_laptop';

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var mouseX = 0;
var mouseY = 0;

// var salazar;

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

// Salazar.loadSalazar(function (gltf) {
//     salazar = gltf.scene;
//     salazar.scale.set(22, 22, 22);
//     salazar.position.z = - 300;
//     salazar.visible = false;
//     scene.add(salazar);
// });
// var lights = Salazar.addSalazarLight(scene);
// Salazar.salazar.visible = false;

Earth.loadEarth(scene);

var laptop;
var laptopRot = {
    x: 0.4, y: 0.6, z: 0
};

Laptop.loadLaptop(function (gltf) {
    laptop = gltf.scene;

    laptop.position.x = 5;
    laptop.position.y = -20;
    laptop.position.z = -20;
    laptop.scale.set(30, 30, 30);
    laptop.rotation.set(laptopRot.x, laptopRot.y, laptopRot.z);
    laptop.visible = true;

    scene.add(laptop);
});

Laptop.loadLaptopLights(scene, [0, 0, 0]);


//  renderer
var renderer = new THREE.WebGLRenderer({
    antialias: false, alpha: true,
    // premultipliedAlpha: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
let div3d = document.querySelector('.model-3d');
div3d.appendChild(renderer.domElement);

// axes helper
// var axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

function animate() {

    requestAnimationFrame(animate);

    Earth.animateOnMouse(mouseX, mouseY, windowWidth, windowHeight);

    const maxRot = 0.15;
    if (laptop) {
        laptop.rotation.y = laptopRot.y + ((mouseX / windowWidth) * maxRot);
        laptop.rotation.x = laptopRot.x + ((mouseY / windowHeight) * maxRot);
    }

    // if (salazar && camera.position.z > -60) {
    //     salazar.visible = false;
    // }

    if (showWhich == 'salazar')
        moveToSalazar();
    if (showWhich == 'earth')
        moveToEarth(camera);
    // if (showWhich == 'laptop')
    //     moveToLaptop(laptop);

    renderer.render(scene, camera);
}

animate();

function moveCamera(obj) {
    let moving = false;
    if (obj.x && camera.position.x < obj.x) {
        camera.position.x += obj.speedX;
        moving = true;
    } else if (obj.x && camera.position.x > obj.x) {
        camera.position.x -= obj.speedX;
        moving = true;
    }

    if (obj.y && camera.position.y < obj.y) {
        camera.position.y += obj.speedY;
        moving = true;
    } else if (obj.y && camera.position.y > obj.y) {
        camera.position.y -= obj.speedY;
        moving = true;
    }

    if (obj.z && camera.position.z < obj.z) {
        camera.position.z += obj.speedZ;
        moving = true;
    } else if (obj.z && camera.position.z > obj.z) {
        camera.position.z -= obj.speedZ;
        moving = true;
    }

    if (!moving) {
        return true;
    } else {
        return false;
    }

}

function moveToSalazar() {
    // if (camera.position.z > -200) {
    moveCamera({ z: -200, speedZ: 1.5 });
    if (laptop.scale.x >= 0) {
        laptop.scale.x -= 0.9;
        laptop.scale.y -= 0.9;
        laptop.scale.z -= 0.9;
    }
    // if (camera.position.z < -60) {
    //     salazar.visible = true;
    // }
    // camera.position.z -= 1.5;
    // }
}

function moveToEarth() {

    const stopped = moveCamera({ z: 130, speedZ: 1.5 });
    if (stopped) {
        if (laptop.scale.x < 30) {
            laptop.scale.x += 0.3;
        }
        if (laptop.scale.y < 30) {
            laptop.scale.y += 0.3;
        }
        if (laptop.scale.z < 30) {
            laptop.scale.z += 0.3;
        }
    }
}

// var crossedOrigin = false;
// function moveToLaptop(laptop) {
//     // console.log('here');

//     if (camera.position.x == 1 && camera.position.y == 1 && camera.position.z == 1) {
//         crossedOrigin = true;
//     }
//     if (!crossedOrigin) {
//         moveCamera({ x: 1, y:1, z: 1, speedX: 1, speedY: 1, speedZ: 1 });
//     }
//     if (crossedOrigin) {
//         camera.lookAt(0, 200, 0);
//         moveCamera({ y: 180, speedY: 1 });
//         if (camera.position.y > 150) {
//             laptop.visible = true;
//         }
//     }
// }

document.querySelector('.button.salazar').addEventListener('click', function () {
    showWhich = 'salazar';
});

document.querySelector('.button.earth').addEventListener('click', function () {
    showWhich = 'earth';
});

// document.querySelector('.button.laptop').addEventListener('click', function () {
//     showWhich = 'laptop';
// });

// TODO: fix this
document.querySelector('.button.salazar').addEventListener('mousemove', function (e) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
});
