// @ts-nocheck
let cubeScene, cubeCamera, cubeRenderer, cubeMesh, cubeFrame;
function initCube() {
    const size = getContainerSize();
    cubeScene = new THREE.Scene();
    cubeCamera = new THREE.PerspectiveCamera(60, size.w / size.h, 0.1, 100);
    cubeCamera.position.set(2, 2, 3);
    cubeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    cubeRenderer.setSize(size.w, size.h);
    cubeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const container = document.getElementById("myContainer");
    container.innerHTML = "";
    container.appendChild(cubeRenderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        roughness: 0.35,
        metalness: 0.4,
    });
    cubeMesh = new THREE.Mesh(geometry, material);
    cubeScene.add(cubeMesh);
    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(3, 5, 4);
    cubeScene.add(light);
    cubeScene.add(new THREE.AmbientLight(0xffffff, 0.35));
    window.addEventListener("resize", onCubeResize);
    cubeAnimate();
}
function cubeAnimate() {
    cubeFrame = requestAnimationFrame(cubeAnimate);
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.014;
    cubeRenderer.render(cubeScene, cubeCamera);
}
function onCubeResize() {
    const size = getContainerSize();
    cubeCamera.aspect = size.w / size.h;
    cubeCamera.updateProjectionMatrix();
    cubeRenderer.setSize(size.w, size.h);
    cubeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
document.addEventListener("DOMContentLoaded", initCube);
