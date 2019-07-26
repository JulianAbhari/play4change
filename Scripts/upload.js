function setup(){
  dropbox = select("#dropbox");
  dropbox.dragOver(highlight);
  dropbox.dragLeave(delight);
  dropbox.drop(gotGame, delight);
}

function highlight() {
  dropbox.style("background-color", "pink");
}

function delight() {
  dropbox.style("background-color", "bisque");
}

function gotGame(game){
//do something
}
