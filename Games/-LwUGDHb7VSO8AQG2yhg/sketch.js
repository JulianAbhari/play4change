let noiseMax = 0;
let slider;
let phase = 0;

function setup() {
  createCanvas(800, 600);
  slider = createSlider(0, 10, 6.2, 0.1);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  //noFill();
  beginShape();
  let noiseMax = slider.value();

  for (var angle = 0; angle < TWO_PI; angle += 0.01) {
    let xOffset = map(cos(angle + phase), -1, 1, 0, noiseMax);
    let yOffset = map(sin(angle), -1, 1, 0, noiseMax);
    let radius = map(noise(xOffset, yOffset), 0, 1, 100, 200);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    // Try setting the width and height to the values of x and y
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.01;

}
