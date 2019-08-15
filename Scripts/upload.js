// Declaring filePaths array to hold the path to each of the uploaded files.
var filePaths;
// Declaring a gameName variable which will later be set to the gameNameInputField
var gameName;
var fileUploadUrl;
var filteredFiles;

function setup() {
  fileUploadUrl = "../nodeServer.js";
  filePaths = [];
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

  // Setting the HTML gameUploader element's callback function
  // This executes when the user has selected which files to upload.
  document.getElementById("gameUploader").addEventListener("change", function(event) {
    // Declaring an output variable to access the HTML fileListing elements
    let output = document.getElementById("fileListing");
    // Declaring the files to the value that the even returned.
    let files = event.target.files;
    // Iterating through all the files...
    for (var i = 0; i < files.length; i++) {
      // Creating a new list element for each item
      let item = document.createElement("li");
      // Setting the item's HTML display to the file at index i's relative path.
      item.innerHTML = files[i].webkitRelativePath;
      // Adding a new list element to the parent 'fileListing' element
      output.appendChild(item);
    }
    // Initializing filtered file array
    filteredFiles = filterFiles(files);
    // Iterating through filtered file array
    for (var i = 0; i < filteredFiles.length; i++) {
      // Declaring a 'currentRelativePath' variable to the filePath of the
      // file at the current index.
      var currentRelativePath = filteredFiles[i].webkitRelativePath
      // Spliting the currentRelativePath by the "/" character and
      // turning the currentRelativePath String to an array of substrings
      var currentFilePath = currentRelativePath.split("/")
      // Declaring the currentFilePath variable to the
      // currentRelativePath array without the first element.
      currentFilePath.shift()
      // Setting the global filePaths at the current index
      // to the currentFilePath array and converting currentFilePath
      // to a string with each element joined by a "/".
      filePaths[i] = currentFilePath.join("/")
      console.log(filePaths[i])
    }
  }, false);
}

function filterFiles(files) {
  var sortedFiles = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].name != ".DS_Store") {
      sortedFiles.push(files[i]);
    }
  }
  return sortedFiles;
}

//This function is a callback function for the "submit button" element.
//It should be called when the user has provided their files
//and the name of their game.
function submitGame() {
  //Setting the gameName to the value of the gameNameInputField
  gameName = document.getElementById("gameNameInputField").value;
  //If the user hasn't provided both their files and their game's name...
  if (filePaths == null || gameName == null) {
    //...a new element is displayed telling the user to fill in the fields.
    createP("Please fill in all the fields");
  } else {
    //If all the fields are filled, a database object is Declared
    //Declaring database to be an instance of firebase's database object
    var database = firebase.database();
    //Declaring a reference string to the current database node.
    //This is used to easily refer back to which ever node will reveive the post.
    var ref = database.ref('Games');
    //Declaring an array of data to be pushed to Firebase Database
    var data = {
      gameName: gameName,
      filePaths: filePaths
    };
    //Declaring gameEntry to be the information for that particular game
    //(like the key, the gamename, and the file paths),
    //while pushing the data to the database.
    var gameEntry = ref.push(data);
    //Print out an array holding the root database reference point
    //and the unique key
    console.log(gameEntry.path.pieces_);

    var gameData = new FormData();
    // Appending to the form data object, the current gameEntry's pieces
    // which is an array of where the data is going in Firebase ("/Games")
    // and the newly created key.
    gameData.append("gameKey", gameEntry.path.pieces_[1])
    gameData.append("gameName", gameName)
    for (var i = 0; i < filteredFiles.length; i++) {
      //gameData.append("fileRelativePath", filePaths[i])
      gameData.append("gameFiles", {filePaths[i] : filteredFiles[i]});
    }

    fetch(fileUploadUrl, {
        method: 'POST',
        body: gameData
      })
      .then(function(response) {
        console.log(response);
        window.location.href = "/"
      })
      .then(function(data) {
        console.log(data);
      });
  }
}
