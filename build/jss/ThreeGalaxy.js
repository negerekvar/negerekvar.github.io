// @ts-nocheck
let galaxyScene, galaxyCamera, galaxyRenderer, stars;
let zRot = 0;
let galaxyFrame;
function initGalaxy() {
    const size = getContainerSize();
    galaxyScene = new THREE.Scene();
    galaxyCamera = new THREE.PerspectiveCamera(65, size.w / size.h, 0.1, 200);
    galaxyCamera.position.set(0, 0, 16);
    galaxyRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    galaxyRenderer.setSize(size.w, size.h);
    galaxyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const container = document.getElementById("myContainer");
    container.innerHTML = "";
    container.appendChild(galaxyRenderer.domElement);
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 4;
        positions[i * 3] = Math.cos(theta) * r;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(theta) * r;
        colors[i * 3] = 0.6 + Math.random() * 0.4;
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.5;
        colors[i * 3 + 2] = 1.0;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        depthWrite: false
    });
    stars = new THREE.Points(geometry, material);
    galaxyScene.add(stars);
    const light = new THREE.AmbientLight(0xffffff, 0.6);
    galaxyScene.add(light);
    window.addEventListener("resize", onGalaxyResize);
    galaxyAnimate();
}
function galaxyAnimate() {
    galaxyFrame = requestAnimationFrame(galaxyAnimate);
    zRot += 0.0025;
    stars.rotation.y = zRot;
    stars.rotation.x = zRot * 0.4;
    galaxyRenderer.render(galaxyScene, galaxyCamera);
}
function onGalaxyResize() {
    const size = getContainerSize();
    galaxyCamera.aspect = size.w / size.h;
    galaxyCamera.updateProjectionMatrix();
    galaxyRenderer.setSize(size.w, size.h);
    galaxyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
document.addEventListener("DOMContentLoaded", initGalaxy);
