let arr = [];
var xoff = 0.0;
var xincrement = 0.0001;
var yoff = 0.0;

function setup() {

    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    let detail = 0;
    rectMode(CENTER);
    // noFill();
    stroke("#FF9F1C");
    strokeWeight(1.5);
    // noStroke();

}

function draw() {

    clear();
    beginShape();

    var xoff = 0; // Option #1: 2D Noise
    // var xoff = yoff; // Option #2: 1D Noise
    // Iterate over horizontal pixels
    for (var x = 0; x <= width; x += 15) {
        // Calculate a y value according to noise, map to 

        // Option #1: 2D Noise
        var y = map(noise(xoff, yoff), 0, 1, 100, 600);

        // Option #2: 1D Noise
        // var y = map(noise(xoff), 0, 1, 200,300);

        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += x1;
    vertex(width + 10, height);
    vertex(0, height);
    endShape(CLOSE);
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
