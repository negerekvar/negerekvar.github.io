// @ts-nocheck
function setup() {
    var _a, _b;
    const container = document.getElementById("myContainer");
    const w = (_a = container === null || container === void 0 ? void 0 : container.clientWidth) !== null && _a !== void 0 ? _a : window.innerWidth;
    const h = (_b = container === null || container === void 0 ? void 0 : container.clientHeight) !== null && _b !== void 0 ? _b : window.innerHeight;
    const mycanvas = createCanvas(w, h);
    mycanvas.parent("myContainer");
    background("#111");
}
function draw() { }
