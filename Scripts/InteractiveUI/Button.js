/*
Button(redirect, image, text1, text2, ...);
image optional, if no image text1 will be displayed in its place
*/
class Button {

  constructor(props) {
    this.href = props.href || null;
    this.onclick = props.onclick || null;
    if (props.image) {
      this.image = loadImage(props.image);
    } else {
      this.image = null;
    }
    this.texts = props.texts || null;
    this.textSize = props.textSize || 12;
    this.textColor = props.textColor || color(0, 0, 0);
    this.w = props.width || 100;
    this.h = props.height || 100;
    this.x = props.x || 0;
    this.y = props.y || 0;
  }

  draw() {
    if (this.image != null) {
      image(this.image, this.x, this.y, this.w, this.h);
      // TODO make text boxes position from bottom left corner (below thumbnail)
      for (var i in this.texts) {
        // +50 is just temporary until we can figure out positioning the text
        fill(255);
        rect(this.x, this.y + this.h + 20*i, this.w, this.h / 10)
        fill(this.textColor);
        textSize(this.textSize);
        text(this.texts[i], this.x, this.y + 15 + this.h + 20*i);
      }
    } else {
      for (var i = 0; i < this.texts.length; i += 1) {
        fill(this.textColor);
        textSize(this.textSize - 2*i);
        text(this.texts[i], this.x, this.y + (this.h / 2) + 12*i);
      }
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
