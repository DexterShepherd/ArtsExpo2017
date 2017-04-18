const InputHandler = require('../input-handler')

const correctRuleSet = [
  [1, 1, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1]
];
const message = "I'm doing well";
const words = ["I'm", 'doing', 'well'];
const intForTest = 193;
const ruleForTest = [1, 1, 0, 0, 0, 0, 0, 1];
const paddedRule = [0, 0, 0, 0, 0, 0, 0, 1];
const handler = new InputHandler(message);

describe(handler, () => {
  test('it has the correct message', () => {
    expect(handler.message).toEqual(message);
  })

  test('it has the correct words', () => {
    expect(handler.words).toEqual(words);
  })

  test('has 3 words', () => {
    expect(handler.numberOfWords).toEqual(3);
  });

  test('has 12 letters', () => {
    expect(handler.length).toEqual(13);
  });

  test('it can correctly convert words into ints', () => {
    expect(handler.convertWord('test')).toEqual(intForTest);
  });

  test('it can correcty turn ints into rulesets', () => {
    expect(handler.ruleFromInt(193)).toEqual(ruleForTest);
  });

  test('it can correcty pad rule arrays', () => {
    expect(handler.padRuleArray([1])).toEqual(paddedRule);
  });

  test('it has the correct ruleset for message', () => {
    expect(handler.rules).toEqual(correctRuleSet);
  });
});
