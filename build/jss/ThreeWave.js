// @ts-nocheck
let waveScene, waveCamera, waveRenderer, mesh, clock, waveFrame;
function initWave() {
    const size = getContainerSize();
    waveScene = new THREE.Scene();
    waveCamera = new THREE.PerspectiveCamera(55, size.w / size.h, 0.1, 100);
    waveCamera.position.set(0, 3, 6);
    waveRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    waveRenderer.setSize(size.w, size.h);
    waveRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const container = document.getElementById("myContainer");
    container.innerHTML = "";
    container.appendChild(waveRenderer.domElement);
    clock = new THREE.Clock();
    const geometry = new THREE.PlaneGeometry(10, 10, 80, 80);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.35,
        metalness: 0.1,
        flatShading: true
    });
    mesh = new THREE.Mesh(geometry, material);
    waveScene.add(mesh);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(3, 5, 4);
    waveScene.add(light);
    waveScene.add(new THREE.AmbientLight(0xffffff, 0.35));
    window.addEventListener("resize", onWaveResize);
    waveAnimate();
}
function waveAnimate() {
    waveFrame = requestAnimationFrame(waveAnimate);
    const t = clock.getElapsedTime();
    const pos = mesh.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y = Math.sin(x * 0.8 + t) * 0.3 + Math.cos(z * 0.6 + t * 1.2) * 0.25;
        pos.setY(i, y);
    }
    pos.needsUpdate = true;
    mesh.rotation.y += 0.0015;
    waveRenderer.render(waveScene, waveCamera);
}
function onWaveResize() {
    const size = getContainerSize();
    waveCamera.aspect = size.w / size.h;
    waveCamera.updateProjectionMatrix();
    waveRenderer.setSize(size.w, size.h);
    waveRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
document.addEventListener("DOMContentLoaded", initWave);
