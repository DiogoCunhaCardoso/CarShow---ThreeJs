import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export function createText(scene, text, pos) {
  const fontLoader = new FontLoader();
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry(text, {
      font,
      size: 0.2,
      height: 0.01,
      curveSegments: 2,
    });

    // Center text
    textGeometry.center();

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff88cc });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(pos.x, pos.y, pos.z);
    scene.add(textMesh);
  });
}
