// ----- Quiz
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz');
const endScreen = document.getElementById('end-screen');
const timerElement = document.getElementById('time');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const finalScoreElement = document.getElementById('final-score');
const submitScoreButton = document.getElementById('submit-score');
const initialsInput = document.getElementById('initials');

// ----- Leaderboard
const leaderboardContainer = document.getElementById('leaderboard');
const highScoresList = document.getElementById('high-scores-list');
const goBackButton = document.getElementById('go-back');
const clearScoresButton = document.getElementById('clear-scores');

let currentQuestionIndex, timeLeft, timerInterval;

const questions = [
    {
        question: "What is the output of `console.log(typeof [])`?",
        answers: [
            { text: "Array", correct: false },
            { text: "Object", correct: true },
            { text: "ArrayObject", correct: false },
            { text: "undefined", correct: false }
        ],
        score: 10
    },
    {
        question: "The creation of computer programs or applications that perform specific tasks or solve particular problems.",
        answers: [
            { text: "Software Development", correct: true },
            { text: "Information Technology", correct: false },
            { text: "Networking", correct: false },
            { text: "Computational Creation", correct: false }
        ],
        score: 10
    },
    {
        question: "Which of the following languages are commonly used for the visual design/display of a website?",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "HTML", correct: false },
            { text: "Markdown", correct: false }
        ],
        score: 10
    },
    {
        question: "Which of the following languages allows for dynamic information and interactivity on web pages for web development?",
        answers: [
            { text: "Cascading Style Sheets", correct: false },
            { text: "Python", correct: false },
            { text: "Ruby", correct: false },
            { text: "JavaScript", correct: true }
        ],
        score: 10
    }
];

startButton.addEventListener('click', startQuiz);
submitScoreButton.addEventListener('click', saveScore);
goBackButton.addEventListener('click', goBack);
clearScoresButton.addEventListener('click', clearHighScores);

function startQuiz() {
    startButton.classList.add('hide');
    author.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    timeLeft = 60;
    totalScore = 0;
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(updateTimer, 1000);
    setNextQuestion();
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        endQuiz();
    }
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

let totalScore = 0;

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        totalScore += questions[currentQuestionIndex].score;
    } else {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScoreElement.textContent = totalScore;
}

// ----- Leaderboard 
function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials) {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const newScore = { initials, score: totalScore };
        scores.push(newScore);
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('scores', JSON.stringify(scores));
        displayHighScores();
    }
}

function displayHighScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    highScoresList.innerHTML = '';
    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.initials} - ${score.score}`;
        highScoresList.appendChild(li);
    });
    endScreen.classList.add('hide');
    leaderboardContainer.classList.remove('hide');
}

function goBack() {
    leaderboardContainer.classList.add('hide');
    author.classList.remove('hide');
    startButton.classList.remove('hide');
}

function clearHighScores() {
    localStorage.removeItem('scores');
    displayHighScores();
}