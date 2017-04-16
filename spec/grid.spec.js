const Grid = require('../src/grid');

const rule = [1, 1, 0, 1, 1, 1, 0, 1];
const neighborhood = [1, 1, 1];
const result = 1;
const width = 200;
const height = 50;
const grid = new Grid(rule, width, height);

describe(grid, () => {
  test('it has the correct ruleset', () => {
    expect(grid.rule).toEqual(rule);
  });

  test('it has the correct width', () => {
    expect(grid.width).toEqual(width);
  });

  test('it has the correct height', () => {
    expect(grid.height).toEqual(height);
  });

  test('it has the right number of cells', () => {
    expect(grid.cells.length).toEqual(width);
    grid.cells.forEach((col) => { expect(col.length).toEqual(height); });
  })

  test('it has correct cell values', () => {
    grid.cells.forEach((col) => {
      const cellValues = col.filter((v, i, self) => self.indexOf(v) === i);
      expect(cellValues.sort()).toEqual([0, 1]);
    });
  })

  test('it returns the correct result for each rule', () => {
    expect(grid.resultForNeighborhood(neighborhood)).toEqual(result);
  });
});
