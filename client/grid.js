class Grid {
  constructor(rule, width, height) {
    this.rule = rule;
    this.width = width;
    this.height = height;
    this.cells_array = [];
    for (let i = 0; i < this.width; i += 1) {
      this.cells_array[i] = [];
      for (let j = 0; j < this.height; j += 1) {
        this.cells_array[i][j] = Number(Math.random() > 0.5);
      }
    }
  }

  get cells() {
    const cells = this.cells_array;
    for (let i = 1; i < this.width - 1; i += 1) {
      for (let j = 1; j < this.height - 1; j += 1) {
        cells[i][j] = this.resultForNeighborhood(
          [
            this.cells_array[i - 1][j - 1],
            this.cells_array[i - 1][j],
            this.cells_array[i - 1][j + 1]
          ]
        );
      }
    }
    return cells;
  }

  resultForNeighborhood(n) {
    if (n[0] === 1 && n[1] === 1 && n[2] === 1) { return this.rule[0]; }
    if (n[0] === 1 && n[1] === 1 && n[2] === 0) { return this.rule[1]; }
    if (n[0] === 1 && n[1] === 0 && n[2] === 1) { return this.rule[2]; }
    if (n[0] === 1 && n[1] === 0 && n[2] === 0) { return this.rule[3]; }
    if (n[0] === 0 && n[1] === 1 && n[2] === 1) { return this.rule[4]; }
    if (n[0] === 0 && n[1] === 1 && n[2] === 0) { return this.rule[5]; }
    if (n[0] === 0 && n[1] === 0 && n[2] === 1) { return this.rule[6]; }
    if (n[0] === 0 && n[1] === 0 && n[2] === 0) { return this.rule[7]; }
    return 'something went wrong :(';
  }
}

module.exports = Grid;
