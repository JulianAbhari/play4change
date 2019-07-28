var filePaths;

function setup() {
  filePaths = [String];
  firebase.initializeApp(firebaseConfig);

  document.getElementById("gamePicker").addEventListener("change", function(event) {
    let output = document.getElementById("listing");
    let files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let item = document.createElement("li");
      item.innerHTML = files[i].webkitRelativePath;
      output.appendChild(item);
      filePaths[i] = files[i].webkitRelativePath;
    };
  }, false);
}

//This is the function that runs when we submit a folder
function submitGame() {
  gameName = document.getElementById("gameName").value;
  if (filePaths == null || gameName == null) {
    createP("Please fill in all the fields");
  } else {
    var database = firebase.database();
    var ref = database.ref('Games');
    var data = {
      gameName: gameName,
      filePath: filePaths
    };
    ref.push(data);
    // firebase.database().ref("Games").set({
    //   gameName: gameName,
    //   filePath: filePaths
    // });
  }
}
