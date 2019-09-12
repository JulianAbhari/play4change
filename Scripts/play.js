function setup() {
  var params = new URLSearchParams(window.location.search);
  var gameFrame = select("#gameFrame");
  gameFrame.attribute("src", `../Games/${params.get("game")}/index.html`);
}
