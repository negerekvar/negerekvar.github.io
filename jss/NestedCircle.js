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
    strokeWeight(.5)
    ellipseMode(CENTER);
    noFill();
    angleMode(DEGREES);
    colorMode(HSB, 100);
}
let theta = 0;
let arr = [];


function draw() {


    clear();
    translate(width * .5, height * .5);
    rotate(params.rot);
    for (var a = 0; a < params.count; a++) {

        let x = cos(theta) * params.r;
        let y = sin(theta) * params.r;
        arr[a] = {
            x: x,
            y: y,
            color: getRandomColor()
        }
        theta += 360 / params.count;
        (theta == 360) && (theta = 0);

    }
    arr.length = params.count;
    for (var i = 0; i < arr.length - 1; i++) {

        var one = createVector(arr[i].x, arr[i].y);

        for (var z = i + 1; z < arr.length; z++) {
            var two = createVector(arr[z].x, arr[z].y);
            line(one.x, one.y, two.x, two.y);
        }
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
Array.prototype.nested = function() {
    for (var i = 0; i < this.length - 1; i++) {
        for (var z = i + 1; z < this.length; z++) {
            if (z == i) {
                continue;
            }
            console.log([this[i], this[z]]);
        }
    }
};
