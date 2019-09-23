/*
Button(redirect, image, text1, text2, ...);
image optional, if no image text1 will be displayed in its place
*/
class Button {
  constructor(props) {
    this.href = props.href || null;
    this.onclick = props.onclick || null;
    this.image = loadImage(props.image) || null;
    this.texts = props.texts || null;
    this.w = props.width || 100;
    this.h = props.height || 100;
    this.x = props.x || 0;
    this.y = props.y || 0;
  }

  draw() {
    image(this.image, this.x, this.y, this.w, this.h);
    // TODO make text boxes position from top left corner
    for (var i in this.texts) {
      var p = createP(this.texts[i]);
      // +50 is just temporary until we can figure out positioning the text
      p.position(this.x, 50 + this.y + this.h + 20*i);
    }
  }

  isClicked(x, y) {
    if (x > this.x &&
      x < (this.x + this.w) &&
      y > this.y &&
      y < (this.y + this.h)) {
      if (this.href) {
        window.location.href = this.href;
      } else {
        this.onclick();
      }
    }
  }
}
