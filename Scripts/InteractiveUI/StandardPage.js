class StandardPage {

  constructor(parameters) {
    this.x = parameters.x || 0;
    this.y = parameters.y || 0;
    this.pageWidth = parameters.pageWidth || 1280;
    this.pageHeight = parameters.pageHeight || 800;
    this.header = parameters.header || "";
    this.textSize = parameters.textSize || 24;
    this.colorPallete = parameters.colorPallete || new ColorPallete(color(210, 210, 210), color(230, 230, 230), color(0, 0, 0));
    this.children = parameters.children || [];
  }

  draw() {
    // Displaying window of the standard page
    noStroke();
    fill(this.colorPallete.primaryColor);
    rect(this.x, this.y, this.pageWidth, this.pageHeight);
    // Displaying header frame
    fill(this.colorPallete.secondaryColor);
    rect(this.x, this.y, this.pageWidth, this.pageHeight / 10);
    // Displaying header
    fill(this.colorPallete.accentColor);
    textSize(this.textSize);
    text(this.header, this.x + (this.pageWidth / 2) - (this.header.length * 0.25 * this.textSize), this.y + (this.pageHeight / 15));
    // Displaying children
    for (var i = 0; i < this.children.length; i += 1) {
      this.children[i].draw();
    }
  }

  addChild(child) {
    this.children.push(child);
  }
}
