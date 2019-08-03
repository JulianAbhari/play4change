var key

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
console.log(params.get("game"))
key = params.get('game')

// Getting only the game with the requested key from Firebase
var ref = database.ref('Games/' + key);
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
    var totalFilePath = "../Games/" + key + "/" + gameName.replace(/%20/g, " ") + "/" + filePaths[i]

    // Console.log all the files being loaded in script tags for dev purposes
    console.log("Loading the following into script tags:" + totalFilePath)

    // Creating script tags for each game file and appending them to the game.html header
    var scriptElement = document.createElement("SCRIPT")
    scriptElement.setAttribute("src", totalFilePath)
    console.log("totalFilePath: " + totalFilePath)
    document.head.appendChild(scriptElement)

    // IDEA: comment the p5 libraries out of game.html, then add them right here AFTER adding the script
  }
}

// L33t err0r handling
function errorData(errorData) {
  console.log('ERROR:' + errorData);
}
