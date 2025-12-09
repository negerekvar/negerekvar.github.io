// @ts-nocheck
let params = {
    r: innerHeight / 4 - 10,
    N: 10,
    X: 2
};
let options = {
    r: 1,
    N: 1,
    X: .01
}
var panel = QuickSettings.create(10, 10, "Panel");
panel.bindRange("r", 20, innerHeight / 2 - 10, 100, 1, params);
panel.bindRange("N", 3, 500, 10, 1, params);
panel.bindRange("X", 1, 99, 2, .01, params);

let mycanvas;

function setup() {

    const size = getContainerSize();
    x = size.w;
    y = size.h;
    mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    strokeWeight(.5)
    ellipseMode(CENTER);
    noFill();
    angleMode(DEGREES);
    colorMode(HSB, 100);

}

let theta = 0;
let arr = [];

function draw() {
    background("black");
    translate(width * .5, height * .5);
    rotate(180);

    for (var a = 0; a < params.N; a++) {

        let x = cos(theta) * params.r;
        let y = sin(theta) * params.r;
        arr[a] = {
            x: x,
            y: y,
            color: getRandomColor()
        }
        theta += 360 / params.N;
        (theta == 360) && (theta = 0);

    };
    arr.length = params.N;
    for (var i = 0; i < arr.length; i++) {

        dot1 = createVector(arr[i].x, arr[i].y);
        last = ~~(i * params.X);
        (last >= arr.length) && (last = last % arr.length);
        dot2 = createVector(arr[last].x, arr[last].y);
        let dist = p5.Vector.dist(dot1, dot2);
        let co = map(dist, 0, 1000, 0, 100);

        stroke(co, 100, 100);
        // vertex(dot1.x, dot1.y);
        // vertex(dot2.x, dot2.y);
        line(dot1.x, dot1.y, dot2.x, dot2.y);



    }
    ellipse(0, 0, params.r * 2);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
