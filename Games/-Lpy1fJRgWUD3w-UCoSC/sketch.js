let walls = [];
let particle;

const sceneH = 400;
const sceneW = 400;

function setup() {
  createCanvas(800, 400);

  for (let i = 0; i < 5; i += 1) {
    walls[i] = new Boundary(random(sceneW), random(sceneH), random(sceneW), random(sceneH))
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, height, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle(sceneW, sceneH);
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.display();
  }
  particle.update();
  particle.display();
  const scene = particle.look(walls);
  const width = sceneW / scene.length;

  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i += 1) {
    noStroke();
    const brightness = map(scene[i] * scene[i], 0, sceneW * sceneW, 255, 0);
    const height = map(scene[i], 0, sceneW, sceneH, 0);
    fill(brightness);
    rectMode(CENTER);
    rect(i * width + width / 2, sceneH / 2, width + 1, height);
  }
  pop();
}

function mouseMoved() {
  if (mouseX >= 0 && mouseX <= sceneW && mouseY >= 0 && mouseY <= sceneH) {
    particle.setLocation(mouseX, mouseY);
  }
}
