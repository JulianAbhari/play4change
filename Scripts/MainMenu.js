var params;
var time = 0;
var balls = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  for (var i = 0; i < 35; i += 1) {
    balls[i] = ellipse(random(0, displayWidth), random(0, displayHeight), 20, 20);
  }
  //Creating the button links to the games
  //TODO: Autogenerate these buttons having them link back
  //to the respective game from the Games folder
  ballGameButton = createButton("ballGame!");
  ballGameButton.position(windowWidth / 3, 200);
  // () => {} notation to make a function on the fly
  ballGameButton.mousePressed(() => {
    selectGame("ballGame");
  });
  testGameButton = createButton("testGame!");
  testGameButton.position(windowWidth * 2 / 3, 200);
  testGameButton.mousePressed(() => {
    selectGame("testGame");
  });

  //Setting params to the current URL which we get from the URLSearchParams object
  params = new URLSearchParams(window.location.search);
}

//This takes the user to the page where the game requested can be played.
//The title of the game that's requested is set to the 'game' variable inside
//URL using the params object
function selectGame(game) {
  //When a game is selected, send the player to play.html with the gamename
  //parameter in the url (?game="gameName")
  params.append("game", game);
  window.location.href = "pages/play.html?" + params;
}

function draw() {
  background(255);
  time += 0.01;
  fill(200, 100, 178);
  for (var i = 0; i < 35; i += 1) {
    balls[i].position.x += map(noise(random(-1, 1)), 0, 1, 0, displayWidth);
    balls[i].position.y += map(noise(random(-1, 1)), 0, 1, 0, displayHeight);
  }
}
