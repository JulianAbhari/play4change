var canvas;
var changeColorButton;
var massSlider;
var input;
var nameP;
var stopButton;
var textBox;

var ballColor;
var ball;
var acceleration;
var velocity;
var position;
var radius;
var mass;

function setup() {
  //changeColorButton = createButton("ZOOM! BOING! DING!");
  //changeColorButton.mousePressed(changeBallColor);
  //stopButton = createButton("STOP!");
  //stopButton.mousePressed(clearVelocity);
  //massSlider = createSlider(20, 100, 30);
  //input = createInput("What's your name?");
  //input.changed(updateText);
  //nameP = createP("hmm...");
  canvas = createCanvas(800, 400);
  //canvas.position(0, 200);
  //textBox = createP("play4change!");
  //textBox.mouseOver(changeStyle);
  //textBox.mouseOut(revertStyle);
  console.log("sketch 2 setting up");
  //radius = massSlider.value();
  radius = 50
  mass = radius / 10;
  ballColor = color(0, 255, 0);
  position = createVector(400, 200);
  ball = ellipse(position.x, position.y, radius * 2, radius * 2);

  velocity = createVector(2, 2);
  acceleration = createVector(0, 0);
}

// function changeStyle() {
//   textBox.style("background-color", "black");
//   textBox.style("color", "green");
//   textBox.style("padding", "8px");
// }

// function revertStyle() {
//   textBox.style("background-color", "green");
//   textBox.style("color", "white");
//   textBox.style("padding", "8px");
// }

// function changeBallColor() {
//   ballColor = color(random(0, 255), random(0, 255), random(0, 255));
// }

// function clearVelocity() {
//   velocity = createVector(0, 0);
// }

function applyForce(force) {
  acceleration.add(createVector(force.x / mass, force.y / mass));
}

function draw() {
  console.log("sketch 2 is drawing");
  background(0);
  noStroke();
  fill(ballColor);
  ballUpdate();
  ballBounce();
}

function ballUpdate() {
  if (keyIsPressed) {
    // var forceVector
    if (keyCode == LEFT_ARROW) {
      applyForce(createVector(-1, 0));
    }
    if (keyCode == RIGHT_ARROW) {
      applyForce(createVector(1, 0));
    }
    if (keyCode == UP_ARROW) {
      applyForce(createVector(0, -1));
    }
    if (keyCode == DOWN_ARROW) {
      applyForce(createVector(0, 1));
    }
  }

  velocity.add(acceleration);
  position.add(velocity);
  acceleration.mult(0);
  mass = radius / 10;
  ball = ellipse(position.x, position.y, radius * 2, radius * 2);
}

function ballBounce() {
  if (position.x + radius > width) {
    position.x = width - radius
    velocity.x *= -1;
  }
  if (position.y + radius > height) {
    position.y = height - radius
    velocity.y *= -1;
  }
  if (position.x - radius < 0) {
    position.x = radius
    velocity.x *= -1;
  }
  if (position.y - radius < 0) {
    position.y = radius
    velocity.y *= -1;
  }
}
