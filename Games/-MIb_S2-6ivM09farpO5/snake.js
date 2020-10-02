function Snake() {
  this.position = createVector(width / 2, height / 2);
  this.speed = createVector(0, 0);
  this.total = 1;
  this.tail = [];

  this.direction = function(x, y) {
    this.speed.x = x * gridScale;
    this.speed.y = y * gridScale;
  }

  this.eat = function(foodPosition) {
    var distance = dist(this.position.x, this.position.y, foodPosition.x, foodPosition.y);
    if (distance < 1) {
      this.total += 1;
      return true;
    } else {
      return false;
    }
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i += 1) {
      var tailPosition = this.tail[i];
      var distance = dist(this.position.x, this.position.y, tailPosition.x, tailPosition.y);
      if (distance < 1 || this.position.x == width || this.position.x == 0 || this.position.y == height || this.position.y == 0) {
        return true;
      }
      return false;
    }
  }

  this.update = function() {
    this.tail[this.total - 1] = createVector(this.position.x, this.position.y);
    if (this.total == this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i += 1) {
        this.tail[i] = this.tail[i+1];
      }
    }

    this.position.add(this.speed);
    this.position.x = constrain(this.position.x, 0, width - gridScale);
    this.position.y = constrain(this.position.y, 0, height - gridScale);
  }

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length - 1; i += 1) {
      rect(this.tail[i].x, this.tail[i].y, gridScale, gridScale);
    }
    rect(this.position.x, this.position.y, gridScale, gridScale);
  }
}
