class Ray {
  constructor(position, angle) {
    this.position = position;
    this.direction = p5.Vector.fromAngle(angle);
  }

  display() {
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.direction.x, this.direction.y);
    pop();
  }

  setAngle(angle) {
    this.direction = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.direction.x = x - this.position.x;
    this.direction.y = y - this.position.y;
    this.direction.normalize();
  }

  cast(wall) {
    const x1 = wall.pointA.x;
    const y1 = wall.pointA.y;
    const x2 = wall.pointB.x;
    const y2 = wall.pointB.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);

    if (denominator == 0) {
      return;
    }

    const t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / denominator;
    const u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / denominator;

    if ((t > 0 && t < 1) && (u > 0)) {
      const intersectionPoint = createVector();
      intersectionPoint.x = x1 + (t * (x2 - x1));
      intersectionPoint.y = y1 + (t * (y2 - y1));
      return intersectionPoint;
    } else {
      return;
    }
  }
}
