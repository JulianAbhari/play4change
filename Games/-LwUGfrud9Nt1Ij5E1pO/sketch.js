var increment = 0.05;
var gridScale = 20;
var columns;
var rows;
var zOffset = 0;

var flowfield;
var particles = [];

function setup() {
  background(255);
  pixelDensity(3);
  createCanvas(800, 500);
  colorMode(HSB);
  columns = floor(width / gridScale);
  rows = floor(height / gridScale);
  flowfield = new Array(columns * rows);

  for (var i = 0; i < 500; i += 1) {
    particles[i] = new Particle();
  }
}

function draw() {
  var xOffset = 0;
  for (var x = 0; x < columns; x += 1) {
    var yOffset = 0;
    for (var y = 0; y < rows; y += 1) {
      var index = (x + y * columns);
      var angle = map(noise(xOffset, yOffset, zOffset), 0, 1, 0, TWO_PI * 3);
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.1);
      flowfield[index] = vector;
      // push();
      // translate(x*gridScale, y*gridScale);
      // rotate(vector.heading());
      // stroke(0);
      // line(0, 0, gridScale, 0);
      // pop();
      yOffset += increment;
    }
    xOffset += increment;
  }
  zOffset += 0.001;
  for (var i = 0; i < particles.length; i += 1) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
