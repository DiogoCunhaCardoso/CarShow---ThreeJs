import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";

const gui = new GUI({
  width: 300,
  title: "All settings",
  closeFolders: true,
});

export function initDebugTruck(scene, mesh) {
  gui.hide();
  window.addEventListener("keydown", (e) => {
    if (e.key == "h") {
      gui.show(gui._hidden);
    }
  });

  const debugObj = {};

  const carFolder = gui.addFolder("Tesla Truck");

  carFolder.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
  carFolder.add(mesh, "visible");

  debugObj.spin = () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, duration: 2 });
  };
  carFolder.add(debugObj, "spin");
}

export function initDebugScene(light1, light2, light3, particles) {
  const sceneFolder = gui.addFolder("Scene");
  // lights
  const lightsFolder = sceneFolder.addFolder("Lights");
  const toggleLightsVisibility = () => {
    const areLightsVisible = light1[0].visible;
    light1.forEach((light) => {
      light.visible = !areLightsVisible;
    });
  };
  lightsFolder
    .add({ toggleLights: toggleLightsVisibility }, "toggleLights")
    .name("PointLights");
  lightsFolder.add(light2, "visible").name("Floor Light");
  lightsFolder.add(light3, "visible").name("Ambient light");

  // particles
  const particleFolder = sceneFolder.addFolder("Particles");

  particleFolder
    .add({ count: particles.geometry.attributes.position.count }, "count")
    .min(0)
    .max(400)
    .step(1)
    .name("Particle Count")
    .onChange((value) => {
      particles.geometry.setDrawRange(0, value);
      particles.geometry.attributes.position.needsUpdate = true;
    });
}
