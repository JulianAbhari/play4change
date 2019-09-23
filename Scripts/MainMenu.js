var params;
var butt;

function setup() {
  createCanvas(800, 600);
  var props1 = {
    href: "pages/play?game=-LpGy4YIZUit2u9RS9I7",
    onclick: function(dingle){
      createP(dingle);
    }.bind(this, "I am dingle"),
    image: "../Games/-LomADUNagUXFrCVmi82/Resources/kasiske.png",
    texts: ["hey whats up", "oh nothing much", "I'm great, thanks!"],
    width: 150,
    height: 200,
    x: 100,
    y:50,
  }
  var props2 = {
    // onclick: function(dingle){
    //   createP(dingle);
    // }.bind(this, "I am dingle"),
    onclick: ()=>{
      fill(200);
      rect(270,20,200,300);
    },
    image: "../Games/-LomADUNagUXFrCVmi82/Resources/drov.jpeg",
    texts: ["This is Drov!", "1.7k views"],
    width: 150,
    height: 200,
    x: 300,
    y:50,
  }
  butt = new Button(props1);
  butt2 = new Button(props2);
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
  // Initializing the firebase database and it's current configuration
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var ref = database.ref('Games');
  // Binding callbacks to a specific event called 'value'
  ref.on('value', loadGames, errorData);

  // Setting params variable to the current URL which we get from the URLSearchParams object
  params = new URLSearchParams(window.location.search);
}

function draw() {
  butt.draw();
  butt2.draw();
}

function mousePressed() {
  butt.isClicked(mouseX, mouseY);
  butt2.isClicked(mouseX, mouseY);
}

// This is a callback function that handles the data from Firebase
function loadGames(firebaseData) {
  // Setting the 'games' variable to all of the children under the
  // 'Games' parent in Firebase
  var games = firebaseData.val();
  // Setting the keys to the 'keys' attribute of any object and
  // giving it the parameter of 'games'. This should fetch the
  // keys from all of the games
  var keys = Object.keys(games);
  // Looping through the keys
  for (var i = 0; i < keys.length; i += 1) {
    // Declaring a 'currentKey' variable and setting it
    // to the current key of the keys array
    var currentKey = keys[i];
    // Declaring a 'gameContents' variable and setting it
    // to the specific game from the 'games' dictionary
    // with the key of the currentKey
    var gameContents = games[currentKey];
    // Creating a button on the fly and giving it the name of the
    // gameName attribute from the gameContents of the current game.
    // Setting the button's 'id' attribute to the key of the current game.
    // Instantiating the mousePressed callback funciton to the 'selectGame'
    // function.
    createButton(gameContents.gameName).attribute("id", currentKey).mousePressed(selectGame)
  }
}

// This is a callback function for firebase if it fails to load up the data.
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
  window.location.href = "pages/play?" + params;
}
