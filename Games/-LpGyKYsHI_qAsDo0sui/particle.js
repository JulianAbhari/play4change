class Particle {
  constructor() {
    this.fov = 90;
    this.pos = createVector(sceneW / 2, sceneH / 2);
    this.rays = [];
    this.heading = 0;
    for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i + this.heading)));
    }
  }

  rotate(angle) {
    this.heading += angle;
    this.rays = [];
    for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i + this.heading)));
    }
  }

  move(dist) {
    const destination = p5.Vector.fromAngle(radians(this.heading), dist);
    this.pos.add(destination);
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 8);
    for (let ray of this.rays) {
      ray.show();
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i + this.heading)));
    }
  }

  look(walls) {
    const scene = [];
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        // Find the point of intersection, and if there is one...
        const pt = ray.cast(wall);
        if (pt) {
          // Check if it is the closest of all the intersections
          let d = p5.Vector.dist(this.pos, pt);
          angleMode(DEGREES);
          const a = degrees(ray.dir.heading()) - this.heading;
          if (!mouseIsPressed) {
            d *= cos(a);
          }
          if (d < record) {
            record = d;
            // If so, set it to 'closest'
            closest = pt;
          }
        }
      }
      // Draw the line to the closest intersection
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene.push(record);
    }
    return scene;
  }
}
