const p5 = require('p5');

function mapRange(value, low1, high1, low2, high2) {
  return Math.floor(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
}

function intToBinArray(input) {
  return (input >>> 0).toString(2).split('').map(i => Number(i));
}

function executeRules(rules, a, b, c) {
  if (a === 1 && b === 1 && c === 1) { return rules[0]; }
  if (a === 1 && b === 1 && c === 0) { return rules[1]; }
  if (a === 1 && b === 0 && c === 1) { return rules[2]; }
  if (a === 1 && b === 0 && c === 0) { return rules[3]; }
  if (a === 0 && b === 1 && c === 1) { return rules[4]; }
  if (a === 0 && b === 1 && c === 0) { return rules[5]; }
  if (a === 0 && b === 0 && c === 1) { return rules[6]; }
  if (a === 0 && b === 0 && c === 0) { return rules[7]; }
  return 'something went wrong :(';
}

function parseMessage(message) {
  return message.split(' ').map(
    word => [
      word.length,
      intToBinArray(word.split('').map(
        c => c.charCodeAt()
      ).reduce(
        (sum, c) => (sum + c) % 255
      ))
    ]
  );
}

new p5( (p) => {
  let cells;
  let w;
  let h;
  let s;
  let rules;
  let message;
  let messageLen;

  p.setup = () => {
    p.createCanvas(800, 800);
    p.noStroke();
    p.fill(255);
    s = 3;
    w = 250;
    h = 50;
    cells = [];
    rules = [];
    message = "I'm doing fine thanks";
    messageLen = message.replace(' ', '').length;
    rules = parseMessage(message);

    for (let i = 0; i < h; i += 1) {
      cells[i] = [];
      for (let j = 0; j < w; j += 1) {
        cells[i][j] = Number(Math.random() > 0.5);
      }
    }

    p.background(200);
    p.translate(25, 200);

    let word = 0;
    for (let i = 1; i < w; i += 1) {
      for (let j = 1; j < h - 1; j += 1) {
        cells[j][i] = executeRules(
          rules[word][1],
          cells[j - 1][i - 1],
          cells[j - 1][i],
          cells[j - 1][i + 1]
        );
        if (i === mapRange(rules[word][0], 0, messageLen, 0, 250)) {
          word += 1;
          console.log(message.split(' ')[word], rules[word])
          p.rect(i * s, -20, 10, 10);
        }
      }
    }

    for (let i = 0; i < h; i += 1) {
      for (let j = 0; j < w; j += 1) {
        if (cells[i][j]) {
          p.rect(j * s, i * s, s, s);
        }
      }
    }
  }

  p.draw = () => { }


  p.mouseClicked = () => {
    p.setup();
  }
});

