// Initializing page variables
var pageWidth;
var pageHeight;
var canvas;
// Initializing UI Elements
var gameUploadButton;
var gameUploadLabel;
var outputList;
var thumbnailButton;
var gameNameInputField;
var submitGameButton;
var submitGameLabel;
// Declaring filePaths array to hold the path to each of the uploaded files.
var filePaths;
// Declaring a gameName variable which will later be set to the gameNameInputField
var gameName;
var studioName = "Fiddlestix";
var plays = 0;

var fileUploadUrl;
var filteredFiles;

function setup() {
  initializeFirebase();
  pageWidth = windowWidth;
  pageHeight = windowHeight
  canvas = createCanvas(pageWidth, pageHeight);
  window.addEventListener("resize", resize);

  mainColorPallete = new ColorPallete(color(210, 210, 210), color(200, 230, 200), color(100, 150, 100));
  mainPage = new StandardPage({
    pageWidth: windowWidth,
    pageHeight: windowHeight,
    header: "Upload your Game!",
    textSize: 30,
    colorPallete: mainColorPallete
  });

  outputList = new p5.Element(document.getElementById("fileListing"));
  outputList.position(0, (pageHeight / 5) * 3 + 100);
  let item = document.createElement("li");
  item.appendChild(document.createTextNode("Successfully Loaded Files: "));
  outputList.child(item);

  gameUploadButton = select('#gameUploadButton');
  gameUploadButton.attribute('class', 'inputFile');
  gameUploadButton.position(0, 0);

  gameUploadButton.changed(function(event) {
    let files = event.target.files;

    for (var i = 0; i < files.length; i++) {
      let item = document.createElement("li");
      item.appendChild(document.createTextNode(files[i].webkitRelativePath));
      outputList.child(item);
    }
  });

  gameUploadLabel = createElement('label', 'Choose game files');
  gameUploadLabel.attribute('class', 'fileLabel');
  gameUploadLabel.attribute('for', 'gameUploadButton');
  gameUploadLabel.position(pageWidth / 2 - 100, (pageHeight / 5));

  thumbnailButton = select('#thumbnailUploader');
  thumbnailButton.attribute('class', 'inputFile');
  thumbnailButton.position(0, 0);
  thumbnailButton.changed(function(event) {
    let files = event.target.files;

    for (var i = 0; i < files.length; i++) {
      let item = document.createElement("li");
      item.appendChild(document.createTextNode(files[i].name));
      outputList.child(item);
    }
  });

  thumbnailLabel = createElement('label', 'Choose box art');
  thumbnailLabel.attribute('class', 'fileLabel');
  thumbnailLabel.attribute('for', 'thumbnailUploader');
  thumbnailLabel.position(pageWidth / 2 - 100, (pageHeight / 5) * 2);

  gameNameInputField = select("#gameNameInputField");
  gameNameInputField.position(pageWidth / 2 - 100, (pageHeight / 5) * 3);

  submitGameButton = select("#submitGame");
  submitGameButton.attribute('class', 'inputFile');
  submitGameButton.position(0, 0);
  submitGameLabel = createElement('label', 'Submit your game!');
  submitGameLabel.attribute('class', 'fileLabel');
  submitGameLabel.attribute('for', 'submitGame');
  submitGameLabel.position(pageWidth / 2 - 100, (pageHeight / 5) * 4 + 100);
}

/**
 Returns the same array of files without any redundant files we don't want to save
 (.DS_Store, p5.js, etc.)
*/
function filterFiles(files) {
  var sortedFiles = [];
  for (var i = 0; i < files.length; i++) {
    switch (files[i].name) {
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
  //If the user hasn't provided both their files and their game's name...
  if (document.getElementById("gameUploadButton").files.length == 0 || document.getElementById("thumbnailUploader").files[0] == null || document.getElementById("gameNameInputField").value == "") {
    //...a new element is displayed telling the user to fill in the fields.
    var warning = createP("Please fill in all the fields");
    warning.position(100, (pageHeight / 5) * 1);
    console.log(`Value of filtered files: ${document.getElementById("gameUploader")} | Value of thumbnail: ${document.getElementById("thumbnailUploader").files[0]} | Value of gameName: ${document.getElementById("gameNameInputField").value}`);
  } else {
    gameName = document.getElementById("gameNameInputField").value;
    filteredFiles = filterFiles(document.getElementById("gameUploadButton").files);
    thumbnail = document.getElementById("thumbnailUploader").files[0];
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
      studioName: studioName,
      plays: plays,
    };
    // Declaring gameEntry to be the information for that particular game
    // (like the key, the gamename, and the file paths),
    // while pushing the data to the database.
    var gameEntry = ref.push(data);

    var gameData = new FormData();
    // Appending the key and the game file to the form data object for each game file.
    // The key is from the current gameEntry's “pieces”
    // （which is an array of where the data is going in Firebase i.e. "/Games"）
    var key = gameEntry.path.pieces_[1]
    for (var i = 0; i < filteredFiles.length; i++) {
      var filePath = `${key}/${filePaths[i]}`
      gameData.append("filePath", filePath)
      gameData.append("gameFiles", filteredFiles[i]);
    }
    gameData.append("filePath", `${key}/thumbnail.png`);
    gameData.append("gameFiles", thumbnail);

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
    gameUploadButton = null;
    gameUploadLabel = null;
    outputList = null;
    thumbnailButton = null;
    gameNameInputField = null;
    submitGameButton = null;
    submitGameLabel = null;

    var success = createP("Game uploaded successfully!");
    success.position(pageWidth / 2 - 150, pageHeight / 2);
  }
}

function initializeFirebase() {
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
}

function resize() {
  pageWidth = windowWidth;
  pageHeight = windowHeight;
  canvas = createCanvas(pageWidth, pageHeight);
  mainPage.resize(pageWidth, pageHeight);
  // Resizing InteractiveUI
  gameUploadLabel.position(pageWidth / 2 - 100, (pageHeight / 5) * 1);
  thumbnailLabel.position(pageWidth / 2 - 100, (pageHeight / 5) * 2);
  gameNameInputField.position(pageWidth / 2 - 100, (pageHeight / 5) * 3);
  outputList.position(0, (pageHeight / 5) * 3 + 100);
  submitGameLabel.position(pageWidth / 2 - 100, (pageHeight / 5) * 4 + 100);
}

function draw() {
  mainPage.draw();
}
