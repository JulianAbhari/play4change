function setup() {
  var params = new URLSearchParams(window.location.search)
  var gameFrame = select("#gameFrame")
  gameFrame.attribute("src", "game?game=" + params.get("game"))
}
