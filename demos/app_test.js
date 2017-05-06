let fs = require("fs");
let files = ["aesthetics", "ARF", "array_math", "Atan2", "attractionRepulsion", "emojis", "gui_test", "HueBall", "InefficientCirclePacking", "LineIntersection", "MetaHue", "NestedCircle", "node_test", "noiseFunction", "panel", "PixelArt", "pixels", "sin_wave", "spiders", "Spiral", "stars", "steering_behaviors", "template", "test", "text_to_motion", "vehicle", "Xtable"];
let html = `
<!DOCTYPE html>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="theme-color" content="#999999">
<meta name="viewport" content="width=device-width, minimum-scale=1.0">
<meta name="description" content="static">
<meta name="author" content="Volkan">
<html>

<head>
<title>template</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&effect=3d-float' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="../bower_components/quicksettings/quicksettings.css" />
    <link rel="stylesheet" type="text/css" href="../style.css" />
</head>

<body>
    <div id="myContainer"></div>
    <script type="text/javascript" src="../bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="../bower_components/p5.js/lib/p5.js"></script>
    <script type="text/javascript" src="../bower_components/p5.collide2D/p5.collide2d.min.js"></script>
    <script type="text/javascript" src="../bower_components/quicksettings/quicksettings.js"></script>
    <script type="text/javascript" src="../jss/template.js"></script>
</body>

</html>
`
for (var i = 0; i < files.length; i++) {
    let bu = files[i];
    let text = html.replace(/template/g, bu);
    fs.writeFile(bu + ".html", text, 'utf8', function(err) {
        if (err) return console.log(err);
    });
}