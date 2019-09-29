var uploadGameButton;

function setup() {
  createCanvas(1280, 660);
  fill(0);
  mainColorPallete = new ColorPallete(color(210, 210, 210), color(200, 230, 200), color(100, 150, 100));
  mainPage = new StandardPage({
    pageWidth: 1280,
    pageHeight: 1000,
    header: "Play4Change",
    textSize: 30,
    colorPallete: mainColorPallete
  });

  var params = new URLSearchParams(window.location.search);
  var gameFrame = createElement('iframe')
  gameFrame.attribute("src", `../Games/${params.get("game")}/index.html`);
  gameFrame.attribute('style', 'background-color: white');
  gameFrame.attribute('width', '1000');
  gameFrame.attribute('height', '500');
  gameFrame.position(140, 140);
}

function draw() {
  mainPage.draw();
}
