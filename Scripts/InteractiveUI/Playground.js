var pageWidth;
var pageHeight;
var uploadGameButton;
var canvas;
var mainPage;
var gamePage;

var gameButtons = [];
var gameButtonWidth = 150;
var gameButtonHeight = 200;
var gameButtonWidthBuffer = 50;
var gameButtonHeightBuffer = 50;
var gameButtonTextHeight = 60;

function setup() {
  initializeFirebase()
  pageWidth = windowWidth;
  pageHeight = windowHeight
  canvas = createCanvas(pageWidth, pageHeight);
  window.addEventListener("resize", resize);
  mainColorPallete = new ColorPallete(color(210, 210, 210), color(200, 230, 200), color(100, 150, 100));
  mainPage = new StandardPage({
    pageWidth: pageWidth,
    pageHeight: pageHeight,
    header: "Play4Change",
    textSize: 30,
    colorPallete: mainColorPallete
  });
  gamePageColorPallete = new ColorPallete(color(210, 210, 210), color(230, 230, 230), color(0, 0, 0));
  gamePage = new StandardPage({
    x: 0,
    y: 0.1 * mainPage.pageHeight,
    pageWidth: pageWidth,
    pageHeight: pageHeight,
    header: "Games",
    textSize: 30,
    colorPallete: gamePageColorPallete
  });
  uploadGameButton = new Button({
    href: `pages/upload`,
    texts: [`Upload a Game`],
    textSize: 18,
    textColor: color(100, 150, 100),
    pageWidth: mainPage.pageWidth,
    pageHeight: mainPage.pageHeight,
    width: 140,
    height: 40,
    xPercent: 0.85,
    yPercent: 0.05,
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
      image: `../Games/${currentKey}/thumbnail.png`,
      texts: [gameContents.gameName, `Studio: ${gameContents.studioName}`, `Plays: ${gameContents.plays}`],
      width: 150,
      height: 200,
      pageWidth: gamePage.pageWidth,
      pageHeight: gamePage.pageHeight,
    }));
    gamePage.addChild(gameButtons[i]);
  }
  populateGames();
  resize();
}

function mousePressed() {
  uploadGameButton.isClicked(mouseX, mouseY);
  // Looping through games array and calling their 'isClicked()' function
  for (var i = 0; i < gameButtons.length; i += 1) {
    gameButtons[i].isClicked(mouseX, mouseY);
  }
}

function resize() {
  populateGames();
  pageWidth = windowWidth;
  canvas = createCanvas(pageWidth, pageHeight);
  mainPage.resize(pageWidth, pageHeight);
  gamePage.y = mainPage.pageHeight * 0.1;
  gamePage.resize(pageWidth, pageHeight);
}

function populateGames() {
  var columns = floor(pageWidth / (gameButtonWidth + gameButtonWidthBuffer));
  var minimumPageHeight = floor((windowHeight * 0.6) + ((gameButtons.length * (gameButtonHeight + gameButtonTextHeight + gameButtonHeightBuffer)) / columns));
  if (minimumPageHeight > windowHeight) {
    pageHeight = minimumPageHeight;
  } else {
    pageHeight = windowHeight;
  }
  var rows = floor(pageHeight / (gameButtonHeight + gameButtonTextHeight + gameButtonHeightBuffer));

  for (var y = 0; y < rows; y += 1) {
    for (var x = 0; x < columns; x += 1) {
      if (x + y * columns < gameButtons.length) {
        gameButtons[x + y * columns].x = (gameButtonWidthBuffer * (x + 1)) + (x * gameButtonWidth);
        gameButtons[x + y * columns].y = (pageHeight * 0.2) + (gameButtonHeightBuffer * (y + 1)) + (gameButtonTextHeight * y) + (y * gameButtonHeight);
      }
    }
  }
}

// This is a callback function for firebase if it fails to load up the data.
function errorData(errorData) {
  console.log('ERROR:' + errorData);
}
