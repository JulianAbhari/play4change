function setup(){
  var params = new URLSearchParams(window.location.search);
  //Select the iFrame that contains the game, and set its src to game.html/?game="the name of the game"
  gameFrame = select("#gameFrame");
  gameFrame.attribute("src", "game.html?"+params);
}
