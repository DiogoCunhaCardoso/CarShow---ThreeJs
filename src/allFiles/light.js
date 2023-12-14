// lights.js

import * as THREE from "three";

//General Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

//Directional Lights (blue, red)
const dllight1 = new THREE.DirectionalLight(0x0000ff, 10);
dllight1.position.set(-1, 5, 1);
dllight1.castShadow = true;

const dllight2 = new THREE.DirectionalLight(0xff0000, 10);
dllight2.position.set(1, 5, -1);
dllight2.castShadow = true;

//Floor Lights
const rectAreaLight = new THREE.RectAreaLight(0xddddff, 50, 10, 10);
rectAreaLight.position.set(0, 10, 4);
rectAreaLight.lookAt(new THREE.Vector3());

const rectAreaLight2 = new THREE.RectAreaLight(0xddeeff, 50, 10, 10);
rectAreaLight2.position.set(0, 10, -4);
rectAreaLight2.lookAt(new THREE.Vector3());

export default {
  ambientLight,
  dllight1,
  dllight2,
  rectAreaLight,
  rectAreaLight2,
};
