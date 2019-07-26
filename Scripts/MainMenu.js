var params;

function setup(){
ballGameButton = createButton("ballGame!");
ballGameButton.position(windowWidth/3, 200);
ballGameButton.mousePressed(() => {
  selectGame("ballGame");
});
testGameButton = createButton("testGame!");
testGameButton.position(windowWidth*2/3, 200);
testGameButton.mousePressed(() => {
  selectGame("testGame");
});

params = new URLSearchParams(window.location.search);
}

function selectGame(game){
  params.append("game", game);
  window.location.href = "pages/play.html?"+params;
}
