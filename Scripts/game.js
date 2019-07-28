function setup(){
var params = new URLSearchParams(window.location.search);

//Create a new script in game.html and give it the src of the game file(s)
gameScript = createElement("script", "");
//gameScript.attribute("src", "../Games/"+params.get('game')+".js");
httpGet(
  "../Games/ballGame",
  function (data){
    console.log("DATA INCOMING:");
    console.log(data);
  },
  function (err){
    console.log(err);
  }
)
}
