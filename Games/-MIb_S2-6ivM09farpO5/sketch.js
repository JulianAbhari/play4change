var snake;
var gridScale = 20;
var food;

function setup() {
  createCanvas(800, 600);
  frameRate(10);

  snake = new Snake();
  food = pickLocation();
}

function draw() {
  background(51);
  noStroke();
  snake.update();
  snake.show();
  if (snake.death()) {
    snake.total = 1;
    snake.tail = [];
  }
  if (snake.eat(food)) {
    food = pickLocation();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, gridScale, gridScale);
}

function pickLocation() {
  var columns = floor(width/gridScale);
  var rows = floor(height/gridScale);
  return createVector(floor(random(columns)), floor(random(rows))).mult(gridScale);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    snake.direction(0, 1);
  }
  if (keyCode == LEFT_ARROW) {
    snake.direction(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    snake.direction(1, 0);
  }
}
