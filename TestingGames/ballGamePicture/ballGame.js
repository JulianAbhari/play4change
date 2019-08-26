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
  console.log("Setup function is executing!")
  changeColorButton = createButton("ZOOM! BOING! DING!");
  changeColorButton.mousePressed(changeBallColor);
  stopButton = createButton("STOP!");
  stopButton.mousePressed(clearVelocity);
  massSlider = createSlider(2, 100, 30);
  input = createInput("What's your name?");
  input.changed(updateText);
  nameP = createP("hmm...");
  canvas = createCanvas(800, 400);
  //canvas.position(0, 200);
  textBox = createP("play4change!");
  textBox.mouseOver(changeStyle);
  textBox.mouseOut(revertStyle);
  imageTest = createElement("img")
  imageTest.attribute("src", "Resources/Drov.jpeg")

  radius = massSlider.value();
  mass = radius / 2;
  ballColor = color(0, 255, 0);
  position = createVector(400, 200);
  ball = ellipse(position.x, position.y, radius * 2, radius * 2);

  velocity = createVector(2, 2);
  acceleration = createVector(0, 0);

  console.log("this should only occur once");
  //flag = true;
}

function changeStyle() {
  textBox.style("background-color", "black");
  textBox.style("color", "green");
  textBox.style("padding", "8px");
}

function revertStyle() {
  textBox.style("background-color", "green");
  textBox.style("color", "white");
  textBox.style("padding", "8px");
}

function changeBallColor() {
  ballColor = color(random(0, 255), random(0, 255), random(0, 255));
}

function updateText() {
  nameP.html("Funny, " + input.value() + " is my favorite food!");
}

function clearVelocity() {
  velocity = createVector(0, 0);
}

function applyForce(force) {
  acceleration.add(createVector(force.x / mass, force.y / mass));
}

function draw() {
  background(100);
  noStroke();
  fill(ballColor);
  ballUpdate();
  ballBounce();
  text(input.value(), position.x, position.y - (radius + 5));
}

function ballUpdate() {
  var forceVector = createVector(0, 0);

  if (keyIsDown(65)) {
    forceVector.x += -1;
    console.log("a is pressed")
  } else if (keyIsDown(68)) {
    forceVector.x += 1;
    console.log("d is pressed")
  }
  if (keyIsDown(87)) {
    forceVector.y += -1;
    console.log("w is pressed")
  } else if (keyIsDown(83)) {
    forceVector.y += 1;
    console.log("s is pressed")
  }
  applyForce(forceVector);

  velocity.add(acceleration);
  position.add(velocity);
  acceleration.mult(0);
  radius = massSlider.value();
  mass = radius / 2;
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
