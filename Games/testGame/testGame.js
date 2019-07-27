var flag = null;

function setup() {
  createCanvas(1000, 1000);
  x = 0;
  console.log("this should only occur once");
  flag = true;
}

function draw() {
  if (flag == null) {
    setup();
  }
  background(255, 0, 0);
  x += 1;
  fill(0, 0, 0);
  rect(x, 50, 100, 200);
}
