export class Quiz {
  questionIndex = 0;
  correctAnswers = 0;

  /**
   *
   * @param {Question[]} questions array of questions
   */
  constructor(questions) {
    this.questions = questions;
  }
  /**
   *
   * @returns {Question} returns the current question
   */
  getCurrentQuestion() {
    return this.questions[this.questionIndex];
  }
  isFinished() {
    return this.questions.length === this.questionIndex;
  }
  /**
   *
   * @param {string} answer submitted answer
   */
  submitAnswer(answer) {
    if (this.getCurrentQuestion().correctAnswer(answer)) {
      this.correctAnswers += 1;
    }
    this.questionIndex += 1;
  }
}
