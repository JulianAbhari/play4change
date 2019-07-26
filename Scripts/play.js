function setup(){
  var params = new URLSearchParams(window.location.search);
  gameFrame = select("#gameFrame");
  gameFrame.attribute("src", "game.html?"+params);
}
