import * as THREE from "three";

let truck;

function createTruck(scene) {
  function createBody(name, depth) {
    let shape = new THREE.Shape();
    const pos = new THREE.Vector3();
    let rot = 0;

    const extrudeSettings = {
      depth: depth,
    };

    switch (name) {
      case "truck":
        let width = 2.6;
        shape.moveTo(0, 0);
        shape.lineTo(0, 0.25);
        shape.lineTo(1, 0.8);
        shape.lineTo(width, 0.35);
        shape.lineTo(width, 0);
        shape.lineTo(0, 0);

        const holePath = new THREE.Path();
        holePath.moveTo(0.05, 0.24);
        holePath.lineTo(0.05, 0.26);
        holePath.lineTo(1, 0.76);
        holePath.lineTo(1.8, 0.55);
        holePath.lineTo(1.8, 0.4);
        shape.holes.push(holePath);

        pos.x = 0;
        pos.y = 0.3;
        break;
    }

    let geometry;
    let material;

    material = new THREE.MeshNormalMaterial();

    geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(pos);
    mesh.rotation.z = rot;
    scene.add(mesh);

    return mesh; // Return the created mesh
  }

  // Assign the created truck to the global variable
  truck = createBody("truck", 0.8);
  scene.add(truck);

  // Rest of your truck-related code...

  return truck;
}

function createWindow(name, x, y, z) {
  let shape = new THREE.Shape();
  const pos = new THREE.Vector3();
  let rot = 0;

  switch (name) {
    case "window":
      shape.moveTo(0.05, 0.24);
      shape.lineTo(0.05, 0.26);
      shape.lineTo(1, 0.76);
      shape.lineTo(1.8, 0.55);
      shape.lineTo(1.8, 0.4);
  }

  let geometry;
  let material;

  material = new THREE.MeshPhysicalMaterial({
    color: 0x1e1e1e,
    transparent: true,
    opacity: 0.5,
    transmission: 1.0,
    ior: 1.5,
    reflectivity: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    metalness: 0.2, // to add tint to color
    side: THREE.DoubleSide,
  });

  geometry = new THREE.ShapeGeometry(shape);
  geometry.center();

  let mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(x, y, z);
  mesh.rotation.z = rot;

  return mesh;
}

function createWheel(x, y, z) {
  const geometry = new THREE.CylinderGeometry(0.18, 0.18, 0.2, 16);
  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e1e1e,
    roughness: 0.7,
    metalness: 0.8,
  });
  const wheel = new THREE.Mesh(geometry, wheelMaterial);
  wheel.rotation.x = Math.PI / 2;
  wheel.position.set(x, y, z);
  truck.add(wheel);
  return wheel;
}

function createheadLightMesh(x, y, z) {
  let amberColor;
  const geometry = new THREE.BoxGeometry(0.12, 0.12, 0.2);

  amberColor = new THREE.Color(0xffbf00);

  const material = new THREE.MeshStandardMaterial({
    color: amberColor,
    emissive: amberColor,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.8,
  });

  const headLight = new THREE.Mesh(geometry, material);
  headLight.position.set(x, y, z);
  truck.add(headLight);
  return headLight;
}

function createheadLight(x, y, z, targetx) {
  const spotLight = new THREE.SpotLight(
    0xffbf00, // color
    1, // intensity
    10, // distance
    Math.PI / 2, // angle
    0.8 // penumbra
  );
  spotLight.intensity = 20;
  spotLight.position.set(x, y, z);

  // target
  const spotLightTarget = new THREE.Object3D();
  truck.add(spotLightTarget); // Add spotLightTarget as a child of the truck

  const targetPositionRelative = new THREE.Vector3(targetx, 0, 0);
  spotLightTarget.position.copy(targetPositionRelative);

  spotLight.target = spotLightTarget;

  truck.add(spotLight);

  return spotLight;
}

export default {
  createTruck,
  createWindow,
  createWheel,
  createheadLightMesh,
  createheadLight,
};
