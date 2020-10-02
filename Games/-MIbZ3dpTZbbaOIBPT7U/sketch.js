var gol;

function setup() {
	createCanvas(600, 600);
	gol = new GameOfLife();
}

function draw() {
	background(255);

	gol.generate();
	gol.display();
}

function mousePressed() {
	gol.init();
}
