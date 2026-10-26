const questions = [
  { question: 'Which symbol starts a comment in Python?', answers: ['//', '#', '/*'], correct: 1, explanation: 'Python uses # for a single-line comment.' },
  { question: 'What does len([4, 8, 12]) return?', answers: ['2', '3', '4'], correct: 1, explanation: 'The list contains three items.' },
  { question: 'Which type stores True or False?', answers: ['bool', 'str', 'float'], correct: 0, explanation: 'The Boolean type (bool) stores True or False.' },
  { question: 'Which loop is commonly used to go through each item in a list?', answers: ['if', 'for', 'def'], correct: 1, explanation: 'A for loop can iterate over each item in a list.' },
  { question: 'What does 7 // 2 return in Python?', answers: ['3', '3.5', '4'], correct: 0, explanation: 'The // operator performs floor division, giving 3.' },
];

const quizView = document.querySelector('#quiz-view');
const resultsView = document.querySelector('#results-view');
const questionText = document.querySelector('#question-text');
const answerList = document.querySelector('#answer-list');
const nextButton = document.querySelector('#next-question');
const feedback = document.querySelector('#answer-feedback');
let questionIndex = 0;
let score = 0;
let selectedAnswer = null;

function renderQuestion() {
  const current = questions[questionIndex];
  selectedAnswer = null;
  feedback.textContent = '';
  nextButton.disabled = true;
  nextButton.innerHTML = 'Check answer <span aria-hidden="true">→</span>';
  document.querySelector('#question-count').textContent = `QUESTION ${String(questionIndex + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
  document.querySelector('#current-score').textContent = String(score);
  document.querySelector('#progress-fill').style.width = `${(questionIndex / questions.length) * 100}%`;
  questionText.textContent = current.question;
  answerList.replaceChildren();
  current.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-option';
    button.textContent = answer;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      selectedAnswer = index;
      answerList.querySelectorAll('.answer-option').forEach((option) => {
        option.classList.remove('selected');
        option.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      nextButton.disabled = false;
      nextButton.innerHTML = 'Check answer <span aria-hidden="true">→</span>';
      feedback.textContent = '';
    });
    answerList.append(button);
  });
}

nextButton.addEventListener('click', () => {
  if (selectedAnswer === null) return;
  if (nextButton.dataset.checked !== 'true') {
    const current = questions[questionIndex];
    const options = [...answerList.querySelectorAll('.answer-option')];
    options.forEach((option, index) => {
      option.disabled = true;
      if (index === current.correct) option.classList.add('correct');
      else if (index === selectedAnswer) option.classList.add('incorrect');
    });
    const correct = selectedAnswer === current.correct;
    if (correct) score += 1;
    document.querySelector('#current-score').textContent = String(score);
    feedback.textContent = `${correct ? 'That’s right!' : 'Not quite.'} ${current.explanation}`;
    nextButton.dataset.checked = 'true';
    nextButton.innerHTML = questionIndex === questions.length - 1 ? 'See results <span aria-hidden="true">→</span>' : 'Next question <span aria-hidden="true">→</span>';
    return;
  }
  nextButton.dataset.checked = 'false';
  questionIndex += 1;
  if (questionIndex < questions.length) renderQuestion();
  else showResults();
});

function showResults() {
  quizView.hidden = true;
  resultsView.hidden = false;
  document.querySelector('#progress-fill').style.width = '100%';
  document.querySelector('#final-score').textContent = `${score} / ${questions.length}`;
  document.querySelector('#result-message').textContent = score === questions.length ? 'Perfect score! You’ve got these fundamentals down.' : score >= 3 ? 'Nice work! Keep practising and you’ll get even sharper.' : 'Good start. Review the explanations and give it another go.';
}

document.querySelector('#restart-quiz').addEventListener('click', () => {
  questionIndex = 0;
  score = 0;
  nextButton.dataset.checked = 'false';
  resultsView.hidden = true;
  quizView.hidden = false;
  renderQuestion();
});

nextButton.dataset.checked = 'false';
renderQuestion();
