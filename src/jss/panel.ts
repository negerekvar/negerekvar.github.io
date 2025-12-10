// @ts-nocheck
let panel = QuickSettings.create(10, 10, "Panel");
let options = {
    r: 120,
    min: 30,
    Animate: true,
};


panel.addHTML("FPS", "");
panel.addHTML("Length", "");
panel.bindRange("r", 60, innerHeight * .5, 120, 1, options);
panel.addBoolean("Animate", true, val => {
    options.Animate = val;
    (val) ? loop(): noLoop();

});

panel.setKey("h");
