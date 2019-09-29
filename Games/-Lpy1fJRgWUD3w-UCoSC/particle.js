class Particle {

  constructor(sceneW, sceneH) {
    this.position = createVector(width / 2, height / 2);
    this.rays = [];
    this.heading = 0;
    this.isMoving = false;
    this.collideWithWall = false;
    this.width = sceneW;
    this.height = sceneH;
    for (let a = -30; a < 30; a += 1) {
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

  setLocation(x, y) {
    if (!this.isMoving) {
      this.position.x = x;
      this.position.y = y;
    }
  }

  move(amount) {
    if (!this.collideWithWall) {
      const velocity = p5.Vector.fromAngle(this.heading);
      velocity.setMag(amount);
      if (this.position.x + velocity.x >= 0 && this.position.x + velocity.x <= sceneW && this.position.y + velocity.y >= 0 && this.position.y + velocity.y <= sceneH) {
        this.position.add(velocity);
      }
    }
  }

  update() {
    if (keyIsDown(65)) {
      this.isMoving = true;
      particle.rotate(-0.1);
    }
    if (keyIsDown(68)) {
      this.isMoving = true;
      particle.rotate(0.1);
    }
    if (keyIsDown(87)) {
      this.isMoving = true;
      particle.move(1);
    }
    this.isMoving = false;
  }

  display() {
    fill(255);
    ellipse(this.position.x, this.position.y, 10);
    for (let ray of this.rays) {
      ray.display();
    }
    if (this.collideWithWall) {
      textSize(24);
      text("You hit the wall", (this.width / 2), this.height / 2);
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
        if (p5.Vector.dist(this.position, closest) <= 5) {
          this.collideWithWall = true;
          console.log("collided with wall");
        } else {
          this.collideWithWall = false;
        }
      }
      scene[i] = record;
    }
    return scene;
  }
}
