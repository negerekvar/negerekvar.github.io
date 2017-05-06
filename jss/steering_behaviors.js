/*Steering Behaviors For Autonomous Characters 
background and update 
by Craig Reynolds 
http://www.red3d.com/cwr/steer/
*/
var sample = []

var points;
var vehicles = [];

function preload() {
    font = loadFont("/fonts/AvenirNextLTPro-Demi.otf");
}

function setup() {

    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    // colorMode(HSB, width, width, width);

    /*istersen gölge ekle */
    sample = font.textBounds("naber", width * 0.5, height * 0.5, 192);
    drawingContext.shadowOffsetX = 1;
    drawingContext.shadowOffsetY = -1;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "black";

    for (var i = 0; i < sample.length; i++) {
        var pt = sample[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);

        // point(pt.x, pt.y);
    }
    console.log(vehicles.length);

}

function draw() {
    clear();
    stroke(255);
    strokeWeight(8);

    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
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
