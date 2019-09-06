var balls = []
var numOfBalls

function setup() {
  createCanvas(600, 400)
  numOfBalls = 30
  for (var i = 0; i < numOfBalls; i += 1) {
    balls.push(new ball(random(10,50), random(width), random(height)))
  }
}

function draw() {
  background(100);
  for (var i = 0; i < balls.length; i += 1) {
    balls[i].applyForce(createVector(0, -0.1))
    if (mouseIsPressed) {
      balls[i].applyForce(createVector(-0.3, 0))
    }
    balls[i].update()
    balls[i].bounce()
  }
}
