class InputHandler {
  constructor(input) {
    this.message = input;
  }

  get numberOfWords() {
    return this.words.length;
  }

  get words() {
    return this.message.split(' ');
  }

  get length() {
    return this.message.replace(' ', '').length;
  }

  convertWord(word) {
    return word.split('').map(
      c => c.charCodeAt()
    ).reduce(
      (sum, c) => (sum + c) % 255
    )
  }

  padRuleArray(input) {
    let padded = input;
    while(padded.length < 8) {
      padded.unshift(0)
    }
    return padded;
  }

  ruleFromInt(input) {
    return this.padRuleArray((input >>> 0).toString(2).split('').map(i => Number(i)));
  }

  get rules() {
    return this.words.map(word => this.ruleFromInt(this.convertWord(word)));
  }
}

module.exports = InputHandler

