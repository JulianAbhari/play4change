class Ant {
  constructor(x, y, speed, homeObj) {
    this.pos = createVector(x, y);
    this.homePos = homeObj.getPos();
    this.speed = speed;
    this.brain = new FSM();
    this.brain.pushState(this.findLeaf);
    this.hasLeaf = false;
  }

  findLeaf() {
    var leafPos = leaf.getPos();

    if (distance(this.pos, leafPos) < 3) {
      this.brain.popState();
      this.brain.pushState(this.goHome);
      this.hasLeaf = true;
      leaf.newLeaf();
    }

    if (distance(this.pos, createVector(mouseX, mouseY)) < 40) {
      this.brain.pushState(this.runAway);
    }

    var velocity = leafPos.sub(this.pos).normalize().mult(this.speed);
    this.pos.add(velocity);
  }

  goHome() {
    const homePos = createVector(this.homePos.x, this.homePos.y);

    if (distance(this.pos, homePos) < 3) {
      this.brain.popState();
      this.brain.pushState(this.findLeaf);
      this.hasLeaf = false;
    }

    if (distance(this.pos, createVector(mouseX, mouseY)) < 40) {
      this.brain.pushState(this.runAway);
    }

    var velocity = homePos.sub(this.pos).normalize().mult(this.speed);
    this.pos.add(velocity);
  }

  runAway() {
    var antPos = createVector(this.pos.x, this.pos.y);
    var ms = createVector(mouseX, mouseY);

    if (distance(antPos, ms) > 200) {
      this.brain.popState();
    }

    var velocity = antPos.sub(ms).normalize().mult(this.speed);
    this.pos.add(velocity);
  }

  update() {
    var state = this.brain.getCurrentState().bind(this);
    state();
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, 20, 20);
    if (this.hasLeaf) {
      fill(0, 255, 0);
      rect(this.pos.x + 5, this.pos.y - 5, 10, 10);
    }
  }

  newHome(newHomePos) {
    this.homePos = newHomePos;
  }
}
