var params;
var time = 0;
var balls = [];

function setup() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDoR0UWaZJv954WzyPLuV-Z2_bAAxuveL8",
    authDomain: "play4change-470f1.firebaseapp.com",
    databaseURL: "https://play4change-470f1.firebaseio.com",
    projectId: "play4change-470f1",
    storageBucket: "play4change-470f1.appspot.com",
    messagingSenderId: "880047762615",
    appId: "1:880047762615:web:777da0438e81baa1"
  };
  //Initializing the firebase database and it's current configuration
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var ref = database.ref('Games');
  //Binding callbacks to a specific event called 'value'
  ref.on('value', loadGames, errorData);

  //Setting params to the current URL which we get from the URLSearchParams object
  params = new URLSearchParams(window.location.search);
}

function loadGames(firebaseData) {
  var games = firebaseData.val();
  var keys = Object.keys(games);
  for (var i = 0; i < keys.length; i += 1) {
    var k = keys[i];
    var gameContents = games[k];
    createButton(gameContents.gameName).attribute("id", k).mousePressed(selectGame)
  }
}

function errorData(errorData) {
  console.log('ERROR:' + errorData);
}

//This takes the user to the page where the game requested can be played.
//The title of the game that's requested is set to the 'game' variable inside
//URL using the params object
function selectGame() {
  //When a game is selected, send the player to play.html with the gamekey
  //parameter in the url (?game="gameName")
  params.append("game", this.attribute("id"));
  console.log(this.attribute("id"))
  window.location.href = "pages/play.html?" + params;
}
