class Home {
  constructor(x, y, maxW, maxH) {
    this.pos = createVector(x, y);
    this.width = 30;
    this.height = 30;
    this.maxW = maxW;
    this.maxH = maxH;
    //this.image = loadImage();
  }

  getPos() {
    return createVector(this.pos.x, this.pos.y);
  }

  update() {
    fill(200);
    rect(this.pos.x, this.pos.y, 30, 30);
  }

  onHome(x, y) {
    // Whether the mouse is within the x and y bounds of the home image
    return (x > (this.pos.x - this.width / 2) &&
      x < (this.pos.x + this.width / 2) &&
      y > (this.pos.y - this.height / 2) &&
      y < (this.pos.y + this.height / 2));
  }

  moveHome(x, y) {
    x = x || random(this.maxW);
    y = y || random(this.maxH);

    this.pos.x = x;
    this.pos.y = y;

    ant.newHome(this.pos);
  }
}
