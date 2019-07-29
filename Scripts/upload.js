//Declaring filePaths array to hold the path to each of the uploaded files.
var filePaths;
//Declaring a gameName variable which will later be set to the gameNameInputField
var gameName;

function setup() {
  filePaths = [String];
  //Initializing the firebase database and it's current configuration
  firebase.initializeApp(firebaseConfig);

  //Setting the HTML gameUploader element's callback function
  //This executes when the user has selected which files to upload.
  document.getElementById("gameUploader").addEventListener("change", function(event) {
    //Declaring an output variable to access the HTML fileListing elements
    let output = document.getElementById("fileListing");
    //Declaring the files to the value that the even returned.
    let files = event.target.files;
    //Iterating through all the files...
    for (let i = 0; i < files.length; i++) {
      //Creating a new list element for each item
      let item = document.createElement("li");
      //Setting the item's HTML display to the file at index i's relative path.
      item.innerHTML = files[i].webkitRelativePath;
      //Adding a new list element to the parent 'fileListing' element
      output.appendChild(item);
      //Setting the global filePaths value at index i to
      //the current file's relative path.
      filePaths[i] = files[i].webkitRelativePath;
    };
  }, false);
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
      filePath: filePaths
    };
    //Pushing the data to firebase database
    ref.set(data);
  }
}
