var filePaths = []
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
//Initializing the firebase database and it's current configuration
firebase.initializeApp(firebaseConfig)
database = firebase.database()

//Setting params to the current URL which we get from the URLSearchParams object
var params = new URLSearchParams(window.location.search)
key = params.get('game')

var ref = database.ref('Games');
//Binding callbacks to a specific event called 'value'
ref.on('value', loadFilePaths, errorData);


function loadFilePaths(firebaseData) {
  var games = firebaseData.val();
  var gameContents = games[key]
  var gameName = gameContents.gameName
  filePaths = gameContents.filePath

  //Create a new script in game.html and give it the src of the game file(s)
  for (var i = 0; i < filePaths.length; i += 1) {
    var totalFilePath = "../Games/" + key + "/" + gameName + filePaths[i]
    console.log("Shoving the following into scipt tags:" + totalFilePath)
    document.createElement("script").setAttribute("src", totalFilePath)
  }
}

function errorData(errorData) {
  console.log('ERROR:' + errorData);
}
