function ball(radius, x, y) {
  this.x = x
  this.y = y
  this.radius = radius
  this.mass = radius / 10
  this.ballColor = color(0, 255, 0)
  this.position = createVector(this.x, this.y)
  this.ball = ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)

  this.velocity = createVector(2, 2)
  this.acceleration = createVector(0, 0)

  this.clearVelocity = function() {
    this.velocity = createVector(0, 0)
  }

  this.applyForce = function(force) {
    this.acceleration.add(createVector(force.x / this.mass, force.y / this.mass))
  }

  this.update = function() {
    noStroke()
    fill(0, 50, 255)

    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
    this.radius = radius
    this.mass = this.radius / 10
    this.ball = ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)
  }

  this.bounce = function() {
    if (this.position.x + this.radius > width) {
      this.position.x = width - this.radius
      this.velocity.x *= -1
    }
    if (this.position.y + this.radius > height) {
      this.position.y = height - this.radius
      this.velocity.y *= -1
    }
    if (this.position.x - this.radius < 0) {
      this.position.x = this.radius
      this.velocity.x *= -1
    }
    if (this.position.y - this.radius < 0) {
      this.position.y = this.radius
      this.velocity.y *= -1
    }
  }
}
