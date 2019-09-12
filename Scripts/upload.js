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
    output.innerHTML = ""
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
  }, false);
}

/**
 Returns the same array of files without any redundant files we don't want to save
 (.DS_Store, p5.js, etc.)
*/
function filterFiles(files) {
  var sortedFiles = [];
  for (var i = 0; i < files.length; i++) {
    switch(files[i].name){
      case ".DS_Store":
        break;
      // case "p5.js":
      //   break;
      default:
        sortedFiles.push(files[i]);
    }
  }
  return sortedFiles;
}

//This function is a callback function for the "submit button" element.
//It should be called when the user has provided their files
//and the name of their game.
function submitGame() {
  gameName = document.getElementById("gameNameInputField").value;
  filteredFiles = filterFiles(document.getElementById("gameUploader").files);

  //If the user hasn't provided both their files and their game's name...
  if (filteredFiles.length == 0 || gameName == null) {
    //...a new element is displayed telling the user to fill in the fields.
    createP("Please fill in all the fields");
  } else {

    // For each file, add its relative path within the upload folder to filePaths[]
    for (var i = 0; i < filteredFiles.length; i++) {
      var currentRelativePath = filteredFiles[i].webkitRelativePath
      var currentFilePath = currentRelativePath.split("/")
      // Take out the first element of the path
      currentFilePath.shift()
      // Rejoin the filepaths without the first element and save them in filePaths
      filePaths[i] = currentFilePath.join("/")
    }

    // Declaring database to be an instance of firebase's database object
    var database = firebase.database();
    // Refrencing the Games folder in firebase
    var ref = database.ref('Games');
    // Declaring an array of data to be pushed to Firebase Database
    var data = {
      gameName: gameName,
      filePaths: filePaths
    };
    // Declaring gameEntry to be the information for that particular game
    // (like the key, the gamename, and the file paths),
    // while pushing the data to the database.
    var gameEntry = ref.push(data);

    var gameData = new FormData();
    // Appending the key and the game file to the form data object for each game file.
    // The key is from the current gameEntry's “pieces”
    // （which is an array of where the data is going in Firebase i.e. "/Games"）
    for (var i = 0; i < filteredFiles.length; i++) {
      var key = gameEntry.path.pieces_[1]
      var filePath = `${key}/${filePaths[i]}`
      gameData.append("filePath", filePath)
      gameData.append("gameFiles", filteredFiles[i]);
    }

    for (var pair of gameData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
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
