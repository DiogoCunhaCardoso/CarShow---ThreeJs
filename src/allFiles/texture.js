import * as THREE from "three";

//
/* FOR BUILDING */
//

const textureLoader = new THREE.TextureLoader();

const colorTexture = textureLoader.load("./textures/display.png");
const roughnessTexture = textureLoader.load("./textures/roughness.png");
const normalTexture = textureLoader.load("./textures/normal.png");
const aoTexture = textureLoader.load("/textures/ao");
const displacementTexture = textureLoader.load(
  "./textures/displacement_metalness.png"
);

colorTexture.colorSpace = THREE.SRGBColorSpace;

colorTexture.repeat.x = 2;
colorTexture.repeat.y = 1;
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

// performance
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;

/* FOR PARTICLES */
const particleTexture = textureLoader.load("./textures/particle.png");

export default {
  colorTexture,
  roughnessTexture,
  normalTexture,
  aoTexture,
  displacementTexture,
  particleTexture,
};
