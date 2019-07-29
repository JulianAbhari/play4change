//This script is used to load in the requested game,
//whose name is found through the URL, into an iFrame object.
function setup() {
  var params = new URLSearchParams(window.location.search);
  //Select the iFrame that contains the game, and set its
  //src to game.html/?game="the name of the game"
  gameFrame = select("#gameFrame");
  gameFrame.attribute("src", "game.html?" + params);
}
