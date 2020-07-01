var leaf;
var ant;
var home;

function setup() {
  createCanvas(400, 400);
  leaf = new Leaf(width, height);
  home = new Home(300, 300, width, height);
  ant = new Ant(300, 300, 2, home);
}

function draw() {
  noStroke();
  rectMode(CENTER);
  background(40);
  fill(200);
  home.update();
  leaf.update();
  ant.update();
}

function mousePressed(){
  if(home.onHome(mouseX, mouseY)){
    home.moveHome();
  } else {
    home.moveHome(mouseX, mouseY);
  }
}

function length(v) {
  return sqrt(v.x * v.x + v.y * v.y);
}

function distance(a, b) {
  newA = createVector(a.x, a.y);
  return length(newA.sub(b));
}
