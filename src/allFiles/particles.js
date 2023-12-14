import * as THREE from "three";
import textures from "./texture.js";
const { particleTexture } = textures;

const createParticles = (scene) => {
  // Geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 400;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xff88cc,
    size: 0.05,
    sizeAttenuation: true,
    alphaMap: particleTexture,
    transparent: true,
    alphaTest: 0.001,
    blending: THREE.AdditiveBlending,
  });

  // Points
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  return particles;
};

export default createParticles;
