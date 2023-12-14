// Libraries
import * as THREE from "three";
import gsap from "gsap";
// Others
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { initResizeHandler } from "./allFiles/resize.js";
import { initDebugTruck, initDebugScene } from "./allFiles/debug.js";
import lights from "./allFiles/light.js";
import { createRoom } from "./allFiles/room.js";
import createParticles from "./allFiles/particles.js";
import { createText } from "./allFiles/text.js";
import truckModule from "./allFiles/truck.js";

const { ambientLight, dllight1, dllight2, rectAreaLight, rectAreaLight2 } =
  lights;

const {
  createTruck,
  createWindow,
  createWheel,
  createheadLightMesh,
  createheadLight,
} = truckModule;

//Truck Animations
let isWheelsRotating = false;
let isWindowClosed = true;
let isLightsOn = false;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);

const room = createRoom();
scene.add(room);

// Particles
const particles = createParticles(scene);

// Text

createText(scene, "O - Windows", { x: -3, y: 3.5, z: -3 });
createText(scene, "L - HeadLights", { x: 0, y: 3.5, z: -3 });
createText(scene, "R - Wheels", { x: 3, y: 3.5, z: -3 });

/* Meshs */

//Truck Body
const truck = createTruck(scene);
truck.castShadow = true;

//Windows
let windowYPosition = 0.1;
let windowXPosition = -0.38;
const carWindow = createWindow(
  "window",
  windowXPosition,
  windowYPosition,
  0.59
);
truck.add(carWindow);
const carWindow2 = createWindow(
  "window",
  windowXPosition,
  windowYPosition,
  -0.59
);
truck.add(carWindow2);

/* WHEELS */
const wheel1 = createWheel(-1, -0.65, -0.45);
const wheel2 = createWheel(-1, -0.65, 0.45);
const wheel3 = createWheel(1, -0.65, -0.45);
const wheel4 = createWheel(1, -0.65, 0.45);

/* HEADLIGHTS */
let amberColor;
const headLight1 = createheadLightMesh(1.45, -0.3, 0.3); // BACK
const headLight2 = createheadLightMesh(1.45, -0.3, -0.3); // BACK
const headLight3 = createheadLightMesh(-1.45, -0.3, 0.3); // FRONT
const headLight4 = createheadLightMesh(-1.45, -0.3, -0.3); // FRONT

function updateHeadlightsEmissive() {
  const headlights = [headLight1, headLight2, headLight3, headLight4];
  for (const headlight of headlights) {
    headlight.material.color.set(
      isLightsOn ? amberColor : new THREE.Color(0x1e1e1e)
    );
    headlight.material.emissiveIntensity = isLightsOn ? 1 : 0;
  }
}

let spotLight = createheadLight(-1.6, -0.25, 0, -10);
let spotLight2 = createheadLight(1.6, -0.25, 0, 10);

/* LIGHTS */
scene.add(ambientLight);
scene.add(dllight1);
scene.add(dllight2);
scene.add(rectAreaLight);

function handleLightVisibility() {
  truck.remove(spotLight);
  truck.remove(spotLight2);
  scene.add(rectAreaLight2);
  if (isLightsOn) {
    truck.add(spotLight);
    truck.add(spotLight2);
    scene.remove(rectAreaLight2);
  } else {
    spotLight.dispose();
    spotLight2.dispose();
  }
}

// Buttons
const geometry = new THREE.SphereGeometry(0.2, 100, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});

const btn1 = new THREE.Mesh(geometry, material);
btn1.position.set(-3.6, 0, 0);
btn1.castShadow = true;
scene.add(btn1);

const btn2 = new THREE.Mesh(geometry, material);
btn2.position.set(3.6, 0, 0);
btn2.castShadow = true;
scene.add(btn2);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Cursor Interaction
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1; // get -1 to 1
  mouse.y = -(e.clientY / sizes.height) * 2 + 1; // get -1 to 1
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case btn1:
        gsap.to(truck.rotation, {
          y: (truck.rotation.y - 45) % (Math.PI * 2),
          duration: 0.5,
        });
        break;
      case btn2:
        gsap.to(truck.rotation, {
          y: (truck.rotation.y + 45) % (Math.PI * 2),
          duration: 0.5,
        });
        break;
    }
  }
});

// Events
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyR":
      isWheelsRotating = !isWheelsRotating;
      break;
    case "KeyL":
      isLightsOn = !isLightsOn;
      break;
    case "KeyO":
      isWindowClosed = !isWindowClosed;

      // Check if the windows have been created before animating
      if (carWindow && carWindow2) {
        windowYPosition = isWindowClosed ? 0.1 : -0.12;
        windowXPosition = isWindowClosed ? -0.38 : 0;

        gsap.to(carWindow.position, {
          y: windowYPosition,
          x: windowXPosition,
          duration: 0.5,
        });
        gsap.to(carWindow2.position, {
          y: windowYPosition,
          x: windowXPosition,
          duration: 0.5,
        });
      }
      break;
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 4;
camera.position.y = 0.15;

//Camera animation
window.onload = () => {
  gsap.to(camera.position, {
    duration: 2,
    z: 3,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.to(truck.rotation, {
        y: (truck.rotation.y + 45) % (Math.PI * 2),
        duration: 0.4,
      });
    },
  });
};
scene.add(camera);

// Controls
/* const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; */

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;

// Variables for tick function
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  /* controls.update(); */

  // Button animation

  btn1.position.y = 0.1 * (Math.sin(elapsedTime) + 1);
  btn2.position.y = 0.1 * (Math.sin(elapsedTime) + 1);

  // Cast a ray
  raycaster.setFromCamera(mouse, camera);

  const rayObjs = [btn1, btn2];
  const intersects = raycaster.intersectObjects(rayObjs);

  for (const object of rayObjs) {
    object.material.color.set("#aaaaaa");
  }

  for (const intersect of intersects) {
    intersect.object.material.color.set("#ff88cc");
  }

  if (intersects.length) {
    currentIntersect = intersects[0]; // mouse enter
  } else {
    currentIntersect = null; // mouse leave
  }

  updateHeadlightsEmissive();
  handleLightVisibility();

  // Particles Animation
  particles.rotation.y = elapsedTime * 0.02;

  // car animation
  if (isWheelsRotating) {
    const rotationSpeed = 0.006;
    const maxRotation = Math.PI / 4;

    // store direction
    if (!wheel1.rotation.direction) {
      wheel1.rotation.direction = 1;
    }

    wheel1.rotation.z += rotationSpeed * wheel1.rotation.direction;
    wheel2.rotation.z += rotationSpeed * wheel1.rotation.direction;
    wheel3.rotation.z += rotationSpeed * wheel1.rotation.direction;
    wheel4.rotation.z += rotationSpeed * wheel1.rotation.direction;

    if (wheel1.rotation.z >= maxRotation || wheel1.rotation.z <= -maxRotation) {
      // Reverse direction
      wheel1.rotation.direction *= -1;
    }
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

initResizeHandler(sizes, camera, renderer, particles);
initDebugTruck(scene, truck);
initDebugScene([dllight1, dllight2], rectAreaLight, ambientLight, particles);
tick();
