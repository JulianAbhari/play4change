let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;
let sliderFoV;

function setup() {
  canvas = createCanvas(800, 400);
  sliderFOV = createSlider(0, 360, 90);
  sliderFOV.input(changeFOV);
  for (let i = 0; i < 5; i++) {
    x1 = random(sceneW);
    x2 = random(sceneW);
    y1 = random(sceneH);
    y2 = random(sceneH);
    walls.push(new Boundary(x1, y1, x2, y2));
  }
  walls.push(new Boundary(-1, 0, sceneW + 1, 0));
  walls.push(new Boundary(0, 0, 0, sceneH));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(-1, sceneH, sceneW + 1, sceneH));
  particle = new Particle();
}

function draw() {
  background(0);
  //particle.update(mouseX, mouseY);
  if (keyIsDown(65)) {
    particle.rotate(-4);
  }
  if (keyIsDown(68)) {
    particle.rotate(4);
  }
  if (keyIsDown(87)) {
    particle.move(3);
  }
  if (keyIsDown(83)) {
    particle.move(-3);
  }

  particle.show();
  for (let wall of walls) {
    wall.show();
  }
  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, sceneH / 2);
  for (let i = 0; i < scene.length; i++) {
    const sq = scene[i]*scene[i];
    const wsq = sceneW * sceneW;
    const bright = map(sq, 0, wsq, 255, 0);
    const height = map(scene[i], 0, sceneW, sceneH, 0);
    noStroke();
    fill(bright);
    rectMode(CENTER);
    // +w/2 is because of rectMode CENTER
    rect(i * w + w / 2, 0, w + 1, height);
  }
  pop();
}

function changeFOV(){
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}
