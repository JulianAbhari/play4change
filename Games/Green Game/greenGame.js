var flag = null

function setup() {
  EndAllLife = createButton("End all life");
  EndAllLife.mousePressed(endAllLife);
  EndAllLife.position(0, 300);

  soup = createP("My favorite food is soup because I am Ness!");
  canvas = createCanvas(1000, 300);

  life = "alive";
  x = width / 4 - 50;
  y = height / 3 - 25;
  speed = 10;

  flag = true
}

function endAllLife() {
  life = null;
}

function draw() {
  if (flag == null) {
    setup()
  }

  clear();
  fill(0, 255, 0);
  if (life) {
    noStroke();
    rect(x, y, 100, 50);
  }
  if (keyIsDown(65)) { //a
    x -= speed;
  } else if (keyIsDown(68)) { //d
    x += speed;
  }
  if (keyIsDown(87)) { //w
    y -= speed;
  } else if (keyIsDown(83)) { //s
    y += speed;
  }

  if (x > width) {
    x = -100;
  } else if (x + 100 < 0) {
    x = width;
  }
  if (y > height) {
    y = -50;
  } else if (y + 50 < 0) {
    y = height;
  }
}
