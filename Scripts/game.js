function setup(){
var params = new URLSearchParams(window.location.search);
gameScript = select("#game");
gameScript.attribute("src", "../Games/"+params.get('game')+".js");
}
