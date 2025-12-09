// @ts-nocheck

function setup() {
    const container = document.getElementById("myContainer");
    const w = container?.clientWidth ?? window.innerWidth;
    const h = container?.clientHeight ?? window.innerHeight;
    const mycanvas = createCanvas(w, h);
    mycanvas.parent("myContainer");
    background("#111");
}

function draw() {}
