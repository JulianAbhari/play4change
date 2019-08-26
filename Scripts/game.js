var urlKey
var gameName
var filePaths

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
ref.on('value', getGameContents, errorData);

function getGameContents(firebaseData) {
  // Initializing game to be the set of info under the certain key in Firebase
  var game = firebaseData.val();
  // Initializing gameName (string) and filePaths(array) using the game returned from Firebase
  gameName = game["gameName"]
  filePaths = game["filePaths"]

  // Load the p5.js first, then afterwards call 'loadP5Libraries'
  createScript("../Libraries/p5.js", loadGameLibraries)
}

/**
createScript() for each non-'p5.js' library in the game's Libraries folder
*/
function loadGameLibraries() {
  var librariesFound = false
  var libraryFilePaths = []
  var filePathsWithoutLibraries = []

  // Put any files within libraries folder into libraryFilePaths[]
  for (var i = 0; i < filePaths.length; i++) {
    var filePathArray = filePaths[i].split("/")
    if (filePathArray[0].toLowerCase() == "libraries") {
      librariesFound = true
      libraryFilePaths.push(filePathArray.join("/"))
    } else {
      // Only add javascript files to the array of filePaths to run
      if (filePaths[i].split(".").pop() == "js") {
        // Add any files that aren't libraries to this array
        filePathsWithoutLibraries.push(filePaths[i])
      }
    }
  }
  // createScript for all files in libraryFilePaths[]
  for (var i = 0; i < libraryFilePaths.length; i++) {
    if (i == libraryFilePaths.length - 1) {
      console.log(`Last library loading from: ../Games/${urlKey}/${gameName}/${libraryFilePaths[i]}`)
      createScript(`../Games/${urlKey}/${gameName}/${libraryFilePaths[i]}`, loadGameScripts.bind(this, filePathsWithoutLibraries))
    } else {
      console.log(`Loading library from: ../Games/${urlKey}/${gameName}/${libraryFilePaths[i]}`)
      createScript(`../Games/${urlKey}/${gameName}/${libraryFilePaths[i]}`)
    }
  }
  if (!librariesFound) {
    console.log("No libraries found! Loading in game scripts...")
    loadGameScripts(filePathsWithoutLibraries)
  }
}

function loadGameScripts(scriptPaths) {
  // Create a new script in game.html and give it the src of the game file(s)
  for (var i = 0; i < scriptPaths.length; i += 1) {

    // Only create scripts for .js files
    if (scriptPaths[i].split(".").pop() == "js") {
      // Create the complete path to the game files in our file server, and for the gameName
      // We have to parse it to replace the "%20" with " "
      var totalFilePath = "../Games/" + urlKey + "/" + gameName.replace(/%20/g, " ") + "/" + scriptPaths[i]

      // If this is the last element in the files array...
      if (i == (scriptPaths.length - 1)) {
        // Create the script tags and load in the file from the
        // 'totalFilePath', and also provide the callback function
        // where p5 gets instantiated.
        createScript(totalFilePath, function() {
          // Only create a new p5 object when the last file has loaded.
          // By doing this, p5 is triggered to start playing the game.
          new p5();
        })
      } else {
        createScript(totalFilePath)
      }
    }
  }
}

/**
createScript (scriptFilePath, callbackFunction) => null
*/
function createScript(totalFilePath, onload = null) {
  // Creates new script tag for the game file and appends it to the game.html header
  var scriptElement = document.createElement('script');
  scriptElement.src = totalFilePath
  // scriptElement.async = false
  scriptElement.onload = onload

  document.body.appendChild(scriptElement);
}

// L33t err0r handling
function errorData(errorData) {
  console.log('ERROR:' + errorData);
}
