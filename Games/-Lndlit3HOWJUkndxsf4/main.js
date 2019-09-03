function preload(){
  //soundFormats("wav");
  teapotSound = loadSound("Resources/teapot.wav");
  groupScream = loadSound("Resources/groupScreams.wav");
  horribleScream = loadSound("Resources/horribleScreams.wav");
}

function setup(){
  createCanvas(400,400);
  teapotSound.setVolume(0.1);
  groupScream.setVolume(0.1);
  horribleScream.setVolume(0.1);
  teapotSound.play();

  groupButton = createButton("Silly sounds :p");
  groupButton.mousePressed(playScream.bind(this, groupScream));
  horribleButton = createButton("Funny sounds xD");
  horribleButton.mousePressed(playScream.bind(this, horribleScream));

  stopButton = createButton("STOP!");
  stopButton.mousePressed(stopSound.bind(this, [teapotSound, groupScream, horribleScream]));
}

function stopSound(elements){
  for (var i = 0; i < elements.length; i += 1) {
    elements[i].stop();
  }
}

function playScream(scream){
  scream.play();
}
