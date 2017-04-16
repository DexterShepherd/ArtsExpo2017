const InputHandler = require('./input-handler.js');
const Grid = require('./grid.js');
const P5 = require('p5');

const input = new InputHandler("I'm so happy");

const renderer = new P5((p) => {
  function drawCells(x, y, w, h, grid) {
    const cells = grid.cells;
    const cellW = w / grid.width;
    const cellH = h / grid.height;

    p.push();
    p.translate(x, y);
    for (let i = 0; i < grid.width; i += 1) {
      for (let j = 0; j < grid.height; j += 1) {
        if (cells[i][j] === 1) {
          p.rect(i * cellW, j * cellH, cellW, cellH);
        }
      }
    }
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(800, 500);
    p.background(250);
    p.noStroke();
    p.fill(200);
    input.rules.forEach((rule, i) => {
      const grid = new Grid(rule, 300, 50);
      drawCells(100, (i + 1) * 70, 600, 70, grid);
    });
  };
});
