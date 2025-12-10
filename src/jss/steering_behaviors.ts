// @ts-nocheck
let sample = []
let offset;
let points;
let vehicles = [];
let _text = "merhaba_dünya";


console.log("merhaba dünya!!!")

function preload() {
    font = loadFont("../fonts/AvenirNextLTPro-Demi.otf");
}

function setup() {

    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    offset = font.textBounds(_text, 0, 0, 150);
    sample = font.textToPoints(_text, width * .5 - (offset.w / 2), height * .5, 150, {
        sampleFactor: 0.25
    });
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";


    for (let i = 0; i < sample.length; i++) {
        let pt = sample[i];
        let vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);

        // point(pt.x, pt.y);
    }


}

function draw() {
    clear();
    stroke(0);
    strokeWeight(8);

    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}


function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}