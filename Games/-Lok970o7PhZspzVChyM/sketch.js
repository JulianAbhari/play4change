class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // keyboardMove(x, y) {
  //   this.x += x;
  //   this.y += y;
  // }

  mouseMove() {
    if (dstToScene(createVector(mouseX, mouseY)) > 0) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  draw() {
    fill(0, 0, 100, 20);
    ellipse(this.x, this.y, 5, 5);
  }

  get pos() {
    return createVector(this.x, this.y);
  }

  // checkCollision(thing){
  //   if(dist(this.xPos, this.yPos, thing.))
  // }
}

class Obstacle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    //this.height = h;
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  get pos() {
    return createVector(this.x, this.y);
  }

}

var debug;
var obstacles;

function setup() {
  canvas = createCanvas(700, 500);
  canvas.style('cursor', 'none');

  debug = false;

  debugModeButton = createElement("button", "Debug Mode");
  debugModeButton.mousePressed(function() {
    debug = !debug;
  });

  obstacles = [];
  for (i = 0; i <= 4; i++) {
    x = Math.random() * (width - 50);
    y = Math.random() * (height - 50);
    r = Math.random() * 50;
    obstacles.push(new Obstacle(x, y, r));
  }
  player1 = new Player(300, 100);
}

function draw() {
  background(200);

  if (debug) {
    fill(0);
    for (x = 0; x < width; x += 20) {
      rect(x, 0, .1, height);
    }
    for (y = 0; y < height; y += 20) {
      rect(0, y, width, .1);
    }
  }

  player1.mouseMove();
  player1.draw();

  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].draw();
  }
  fill(0, 255, 0, 20);
  ellipse(player1.pos.x, player1.pos.y, dstToScene(player1.pos) * 2, dstToScene(player1.pos) * 2);
}

function dstToScene(p) {
  var distance = Infinity;
  for (i = 0; i < obstacles.length; i++) {
    var d = signedDstToCircle(p, obstacles[i].pos, obstacles[i].r);
    distance = min(distance, d);
  }
  return distance;
}

function vecAbs(v1) {
  return createVector(sqrt(v1.x * v1.x), sqrt(v1.y * v1.y));
}

function length(v) {
  return sqrt(v.x * v.x + v.y * v.y);
}

// Signed because if the point is within circle, length is negative
function signedDstToCircle(point, center, radius) {
  return length(center.sub(point)) - radius;
}

// function signedDstToBox(point, center, size){
//   offset = abs(point.sub(center)), size;
//
// }
