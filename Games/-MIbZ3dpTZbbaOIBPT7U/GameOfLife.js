class GameOfLife {

  constructor() {
    this.cellWidth = 8;
    this.columns = width / this.cellWidth;
    this.rows = height / this.cellWidth;
    this.board = new Array(this.columns);
    for (var i = 0; i < this.board.length; i += 1) {
      this.board[i] = new Array(this.rows);
    }
    this.init();
  }

  init() {
    for (var x = 1; x < this.columns - 1; x += 1) {
      for (var y = 1; y < this.rows - 1; y += 1) {
        this.board[x][y] = Math.floor(random(2));
      }
    }
  }

  generate() {
    var nextGeneration = new Array(this.columns);
    for (var i = 0; i < nextGeneration.length; i += 1) {
      nextGeneration[i] = new Array(this.rows);
    }
    for (var x = 1; x < this.columns - 1; x += 1) {
      for (var y = 1; y < this.rows - 1; y += 1) {

        var neighbors = 0;
        for (var i = -1; i <= 1; i += 1) {
          for (var j = -1; j <= 1; j += 1) {
            neighbors += this.board[x + i][y + j];
          }
        }
        // This is to remove the current cell's state
        // since it was added in the above loop
        neighbors -= this.board[x][y];

        // ------Rules of Life-------
        // Loneliness
        if ((this.board[x][y] == 1) && (neighbors < 2)) {
          nextGeneration[x][y] = 0;
        }
        // Overpopulation
        else if ((this.board[x][y] == 1) && (neighbors > 3)) {
          nextGeneration[x][y] = 0;
        }
        // Reproduction
        else if ((this.board[x][y] == 0) && (neighbors == 3)) {
          nextGeneration[x][y] = 1;
        }
        // Stasis
        else {
          nextGeneration[x][y] = this.board[x][y];
        }
      }
    }
    this.board = nextGeneration;
    console.log(nextGeneration[x][y]);
  }

  display() {
    for (var i = 0; i < this.columns; i += 1) {
      for (var j = 0; j < this.rows; j += 1) {
        if (this.board[i][j] >= 1) fill(0);
        else fill(255);
        noStroke();
        rect(i * this.cellWidth, j * this.cellWidth, this.cellWidth, this.cellWidth);
      }
    }
  }
}
