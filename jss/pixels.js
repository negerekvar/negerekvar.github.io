var yoff = 22;
var xoff = 0;
var ne = [];
var ko = [];
var bu = [];
var vid;

var _index;

function preload() {
    img = loadImage("../images/bunny.png", function() {
        // img.resize(img.width / 1, img.height / 1);

    }, function() {
        console.log("hata resim yok !")
    });
    img2 = loadImage("../images/dog.jpg", function() {
        // img2.resize(img2.width / 1, img2.height / 1);

    }, function() {
        console.log("hata resim yok !")
    });
}


function setup() {
    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    rectMode(CENTER);
    imageMode(CENTER);
    mid_point = createVector(width / 2, height / 2);

    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";

    img.loadPixels();
    img2.loadPixels();

    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            _index = (x + y * img.width) * 4;
            bw = (img.pixels[_index] + img.pixels[_index + 1] + img.pixels[_index + 2]) / 3
            var w = map(bw, 0, 255, 5, 10);
            ne.push({
                x: (x * 5) + mid_point.x - (img.width / 2) * 5,
                y: (y * 5) + mid_point.y - (img.height / 2) * 5,

                color: color(img.pixels[_index], img.pixels[_index + 1], img.pixels[_index + 2]),
                color2: color(img2.pixels[_index], img2.pixels[_index + 1], img2.pixels[_index + 2]),
                radius: w
            })
        }
    }
    for (var i = 0; i < ne.length; i++) {
        var vec = createVector(ne[i].x, ne[i].y);
        var col = ne[i].color;
        var nx_col = ne[i].color2;
        bu.push(new Git(vec, col, nx_col));
    }


    noStroke();
}

function draw() {
    clear();
    for (var i = 0; i < bu.length; i++) {
        bu[i].oraya();
        bu[i].ciz();
        bu[i].check_next();
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

function Git(obj, col, col2) {
    this.pos = createVector(random(width), random(height));
    this.target = {
        real: obj,
        pivot: obj
    }
    this.fill = {
        dog: col2,
        cat: col
    }
    this.flag = false;
    this.weight = 6;
    this.color = this.fill.cat;
}
Git.prototype.oraya = function() {
    this.pos.lerp(this.target.real, 0.05);
};
Git.prototype.ciz = function() {
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.weight, this.weight);
};
Git.prototype.check_next = function() {
    this.di = this.pos.dist(this.target.real);
    (this.di < .001) && (this.color = this.fill.dog);
};