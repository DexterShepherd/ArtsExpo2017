const InputHandler = require('./input-handler.js');
const Grid = require('./grid.js');
const P5 = require('p5');

const body = document.querySelector('body');
const submit = document.querySelector('#submit');
const inputField = document.querySelector('#response');
const backgroundColor = '#ffffff';
const foregroundColor = '#cccccc';

const renderer = new P5((p) => {
  function drawCells(x, y, w, h, grid) {
    const cells = grid.cells;
    const cellW = w / grid.width;
    const cellH = h / grid.height;

    for (let i = 0; i < grid.width; i += 1) {
      for (let j = 0; j < grid.height; j += 1) {
        if (cells[i][j] === 1) {
          p.rect(x + i * cellW, y + j * cellH, cellW, cellH);
        }
      }
    }
  }

  function render(input) {
    p.background(backgroundColor);
    p.noStroke();
    p.fill(foregroundColor);
    p.push();
    p.translate(100, 100);
    input.rules.forEach((rule, i) => {
      const grid = new Grid(rule, 300, 50);
      const w = p.map(input.words[i].length, 0, input.length, 0, 600);
      drawCells(0, 0, w, 100, grid);
      p.translate(w, 0);
    });
    p.pop();
  }

  p.setup = () => {
    body.bgColor = backgroundColor;
    body.style.color = foregroundColor;
    const canvas = p.createCanvas(800, 500);
    canvas.parent(document.querySelector('.canvas-container'));
    render(new InputHandler('Hello there'));
  };

  submit.addEventListener('click', () => {
    const response = inputField.value;
    render(new InputHandler(response));
    p.httpPost('/', 'json', {
      data: response
    });
  })
});
