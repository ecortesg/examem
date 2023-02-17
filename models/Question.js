export class Question {
  /**
   *
   * @param {string} text text of the question
   * @param {string[]} choices choices to answer the question
   * @param {number} answerIndex index of the correct answer
   */

  constructor(text, choices, answerIndex) {
    this.text = text;
    this.choices = choices;
    this.answerIndex = answerIndex;
  }

  /**
   *
   * @param {string} choice submitted answer
   * @returns {boolean} true if the answer is correct
   */

  correctAnswer(choice) {
    return choice === this.choices[this.answerIndex];
  }
}
