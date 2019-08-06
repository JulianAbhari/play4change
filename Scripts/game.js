var urlKey
var names = ["Julian", "Michael"]

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
firebase.initializeApp(firebaseConfig)
database = firebase.database()

// Setting params to the current URL which we get from the URLSearchParams object
var params = new URLSearchParams(window.location.search)
urlKey = params.get('game')

// Getting only the game with the requested key from Firebase
var ref = database.ref('Games/' + urlKey);
// Binding callbacks to a specific event called 'value'
ref.on('value', loadFilePaths, errorData);


function loadFilePaths(firebaseData) {
  // Initializing game to be the set of info under the certain key in Firebase
  var game = firebaseData.val();
  // Initializing gameName (string) and filePaths(array) using the game returned from Firebase
  var gameName = game["gameName"]
  var filePaths = game["filePaths"]

  // Create a new script in game.html and give it the src of the game file(s)
  for (var i = 0; i < filePaths.length; i += 1) {
    // Create the complete path to the game files in our file server, and for the gameName
    // We have to parse it to replace the "%20" with " "
    var totalFilePath = "../Games/" + urlKey + "/" + gameName.replace(/%20/g, " ") + "/" + filePaths[i]

    // Console.log all the files being loaded in script tags for dev purposes
    console.log("Loading the following into script tags:" + totalFilePath)

    //Creating script tags for each game file and appending them to the game.html header
    var scriptElement = document.createElement("SCRIPT")
    scriptElement.src = totalFilePath
    // Manually overriding dynamically added script's async
    scriptElement.async = false
    document.head.appendChild(scriptElement)
  }
  // IDEA: comment the p5 libraries out of game.html, then add them right
  // here AFTER adding the script

  console.log("Loading the p5 libraries into script tags")

  // Manually set all scripts' async to false, because I read here that
  // dynamically added script are async by default, which would screw up the order,
  // And it works!
  // https://www.html5rocks.com/en/tutorials/speed/script-loading/

  // Now, our problem is determining which libraries to load first when the user
  // gives us their game... and then to actually have the game WORK
  var p5MainScript = document.createElement("SCRIPT")
  p5MainScript.src = "../Libraries/p5.js"
  p5MainScript.async = false
  document.head.appendChild(p5MainScript)

  var p5SoundScript = document.createElement("SCRIPT")
  p5SoundScript.src = "../Libraries/p5.sound.js"
  p5SoundScript.async = false
  document.head.appendChild(p5SoundScript)

  var p5DomScript = document.createElement("SCRIPT")
  p5DomScript.src = "../Libraries/p5.dom.js"
  p5DomScript.async = false
  document.head.appendChild(p5DomScript)

  // OBSERVATIONS: The selected game works even by having its libraries
  // added in after the game, like what's shown above.
}

// L33t err0r handling
function errorData(errorData) {
  console.log('ERROR:' + errorData);
}
