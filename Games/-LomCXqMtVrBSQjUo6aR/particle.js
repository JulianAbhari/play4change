class Particle {

  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.rays = [];
    this.heading = 0;
    for (let a = 270; a < 360; a += 1) {
      this.rays.push(new Ray(this.position, radians(a)));
    }
  }

  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = 0; a < this.rays.length; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index += 1;
    }
  }

  update(x, y) {
    this.position.set(x, y);
  }

  display() {
    fill(255);
    ellipse(this.position.x, this.position.y, 10);
    for (let ray of this.rays) {
      ray.display();
    }
  }

  look(walls) {
    let scene = [];

    for (let i = 0; i < this.rays.length; i += 1) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const intersectionPoint = this.rays[i].cast(wall)
        if (intersectionPoint != null) {
          const distance = p5.Vector.dist(this.position, intersectionPoint);
          if (distance < record) {
            record = distance;
            closest = intersectionPoint;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.position.x, this.position.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }
}
