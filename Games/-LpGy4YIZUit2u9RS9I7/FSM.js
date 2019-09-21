class FSM {
  constructor() {
    this.stack = [];
  }

  update() {
    var currentStateFunction = this.getCurrentState();
    if (currentStateFunction) {
      currentStateFunction();
    }
  }

  getCurrentState() {
    return this.stack.length > 0 ? this.stack[0] : null;
  }

  pushState(newState) {
    if (this.getCurrentState() != newState) {
      this.stack.unshift(newState);
    }
  }

  popState() {
    return this.stack.shift();
  }
}
