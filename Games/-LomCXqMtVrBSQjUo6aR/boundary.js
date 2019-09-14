class Boundary {
  constructor(x1, y1, x2, y2) {
    this.pointA = createVector(x1, y1);
    this.pointB = createVector(x2, y2);
  }

  display() {
    stroke(255);
    line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  }

}
