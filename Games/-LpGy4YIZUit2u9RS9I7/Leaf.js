class Leaf{
  constructor(maxW, maxH){
    // Adjust for the size of the image
    this.maxW = maxW - 25;
    this.maxH = maxH - 15;

    this.pos = createVector(map(random(), 0, 1, 25, this.maxW), map(random(), 0, 1, 30, this.maxW));
    //this.image = loadImage()
  }

  newLeaf(){
    this.pos = createVector(random(this.maxW), random(this.maxH));
  }

  getPos(){
    return createVector(this.pos.x, this.pos.y);
  }

  update(){
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y, 50, 30);
  }
}
