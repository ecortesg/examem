import { Question } from "./models/Question.js";
import { Quiz } from "./models/Quiz.js";

async function fetchQuestions() {
  const response = await fetch("./data/questions.json");
  const jsonResponse = await response.json();
  const array = jsonResponse.map(
    (question) =>
      new Question(question.text, question.choices, question.answerIndex)
  );
  console.log(array.length)
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 25);
}

function showScore(correctAnswers, numberQuestions) {
  const element = document.getElementById("quiz");
  const quizEndHTML = `
  <h1>Resultado</h1>
  <h2>Aciertos: ${correctAnswers}/${numberQuestions}</h2>
  <h2>Calificación: ${((correctAnswers / numberQuestions) * 100).toFixed(1)}</h2>
  <h2>Calificación mínima aprobatoria: 85.0</h2>
  <button class="button" onclick="location.href='/'">Reintentar</button>`;
  element.innerHTML = quizEndHTML;
}

function showProgress(currentIndex, numberQuestions) {
  const element = document.getElementById("progress");
  element.innerHTML = `${currentIndex}/${numberQuestions}`;
}

function verifyAnswer(choice, correctAnswer, button) {
  const element = document.getElementsByClassName("answer")[0];
  const buttons = Array.from(document.getElementsByClassName("choice"));
  
  buttons.map((button) => {
    button.disabled = true;
    button.style.background = "grey";
  });

  if (choice === correctAnswer) {
    button.style.background = "green";
  } else {
    button.style.background = "red";
    element.style.background = "green";
  }
  
}

function renderQuestion(quiz) {
  if (quiz.isFinished()) {
    showScore(quiz.correctAnswers, quiz.questions.length);
  } else {
    const questionText = document.getElementById("question");
    const choicesContainer = document.getElementById("choices");
    const currentQuestion = quiz.getCurrentQuestion();
    const correctAnswer = currentQuestion.choices[currentQuestion.answerIndex];
    choicesContainer.innerHTML = "";

    questionText.innerHTML = currentQuestion.text;
    showProgress(quiz.questionIndex + 1, quiz.questions.length);

    currentQuestion.choices.map((choice) => {
      const button = document.createElement("button");
      button.innerHTML = choice;
      button.className = "button choice";
      if (choice === correctAnswer) {
        button.classList.add("answer");
      }
      button.addEventListener("click", () => {
        quiz.submitAnswer(choice);
        verifyAnswer(correctAnswer, choice, button);
      });
      choicesContainer.append(button);
    });
  }
}

const questions = await fetchQuestions();
const quiz = new Quiz(questions);
const nextQuestion = document.getElementById("next");
nextQuestion.addEventListener("click", () => renderQuestion(quiz));
renderQuestion(quiz);
