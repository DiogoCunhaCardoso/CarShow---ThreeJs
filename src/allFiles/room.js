// room.js
import * as THREE from "three";
import textures from "./texture.js";
const {
  colorTexture,
  roughnessTexture,
  normalTexture,
  aoTexture,
  displacementTexture,
} = textures;

export const createRoom = () => {
  const room = new THREE.Group();

  // WALLS
  // 1
  const geometryWall1 = new THREE.BoxGeometry(20, 10, 0.2);
  const materialWall = new THREE.MeshPhysicalMaterial({
    color: 0x1e1e1e,
    map: colorTexture,
    roughnessMap: roughnessTexture,
    normalMap: normalTexture,
    aoMap: aoTexture,
    displacementMap: displacementTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });
  const wall1 = new THREE.Mesh(geometryWall1, materialWall);
  wall1.position.set(0, 0, -6);
  room.add(wall1);

  // 2
  const geometryWall2 = new THREE.BoxGeometry(20, 10, 0.2);
  const wall2 = new THREE.Mesh(geometryWall2, materialWall);
  wall2.position.set(0, 0, 6);
  room.add(wall2);

  //3
  const geometryWall3 = new THREE.BoxGeometry(0.2, 10, 12);
  const wall3 = new THREE.Mesh(geometryWall3, materialWall);
  wall3.position.set(10, 0, 0);
  room.add(wall3);

  //4
  const geometryWall4 = new THREE.BoxGeometry(0.2, 10, 12);
  const wall4 = new THREE.Mesh(geometryWall4, materialWall);
  wall4.position.set(-10, 0, 0);
  room.add(wall4);

  // CEILING
  const geometryCeiling = new THREE.BoxGeometry(20, 0.2, 12);
  const ceiling = new THREE.Mesh(geometryCeiling, materialWall);
  ceiling.position.set(0, 4, 0);
  room.add(ceiling);

  // FLOOR
  const geometryFloor = new THREE.PlaneGeometry(20, 12);
  const floor = new THREE.Mesh(geometryFloor, materialWall);
  floor.rotation.x = Math.PI / 2;
  floor.position.set(0, -0.5, 0);
  floor.receiveShadow = true;
  room.add(floor);

  return room;
};
