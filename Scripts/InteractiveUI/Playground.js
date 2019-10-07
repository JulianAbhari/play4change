var params;
var standardPage;
var gameButtons = [];
var uploadGameButton;

function setup() {
  initializeFirebase()
  createCanvas(windowWidth, windowHeight);
  window.addEventListener("resize", resize);
  // Setting params variable to the current URL which we get from the URLSearchParams object
  params = new URLSearchParams(window.location.search);
  mainColorPallete = new ColorPallete(color(210, 210, 210), color(200, 230, 200), color(100, 150, 100));
  mainPage = new StandardPage({
    pageWidth: windowWidth,
    pageHeight: windowHeight,
    header: "Play4Change",
    textSize: 30,
    colorPallete: mainColorPallete
  });
  gamePageColorPallete = new ColorPallete(color(210, 210, 210), color(230, 230, 230), color(0, 0, 0));
  gamePage = new StandardPage({
    x: 0,
    y: 0.1 * mainPage.pageHeight,
    pageWidth: windowWidth,
    pageHeight: windowHeight,
    header: "Games",
    textSize: 30,
    colorPallete: gamePageColorPallete
  });
  uploadGameButton = new Button({
    href: `pages/upload`,
    texts: [`Upload a Game`],
    textSize: 18,
    textColor: color(100, 150, 100),
    width: 140,
    height: 40,
    xPercent: 0.85,
    yPercent: 0.1,
    pageWidth: mainPage.pageWidth,
    pageHeight: mainPage.pageHeight,
  })
  mainPage.addChild(gamePage);
  mainPage.addChild(uploadGameButton);
}

function initializeFirebase() {
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
}

function draw() {
  mainPage.draw();
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
    // When a game is selected, send the player to play.html with the gamekey
    // parameter in the url (?game="gameName")
    console.log(`pages/play?game=${currentKey}`);
    gameButtons.push(new Button({
      href: `pages/play?game=${currentKey}`,
      image: "../Games/-LomADUNagUXFrCVmi82/Resources/drov.jpeg",
      texts: [gameContents.gameName, `Plays: ${gameContents.plays}`, `Studio: ${gameContents.studioName}`],
      width: 150,
      height: 200,
      xPercent: .2 + .1*i,
      yPercent: .4,
      pageWidth: gamePage.pageWidth,
      pageHeight: gamePage.pageHeight,
    }));
    gamePage.addChild(gameButtons[i]);
  }
}

function mousePressed() {
  uploadGameButton.isClicked(mouseX, mouseY);
  // Looping through games array and calling their 'isClicked()' function
  for (var i = 0; i < gameButtons.length; i += 1) {
    gameButtons[i].isClicked(mouseX, mouseY);
  }
}

function resize(){
  mainPage.resize();
  gamePage.resize();
}

// This is a callback function for firebase if it fails to load up the data.
function errorData(errorData) {
  console.log('ERROR:' + errorData);
}
