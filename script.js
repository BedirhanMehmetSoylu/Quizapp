let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Wofür steht HTML?",
        "answer_1": "Hypertext Markup Language",
        "answer_2": "Home Tool Markup Language",
        "answer_3": "Hyperlinks and Text Markup Language",
        "answer_4": "Hyperlinks and Tool Markup Language",
        "right_answer": 1
    },
    {
        "question": "Wer macht die Web Standards?",
        "answer_1": "Google",
        "answer_2": "Mozilla",
        "answer_3": "The World Wide Web Consortium",
        "answer_4": "Microsoft",
        "right_answer": 3
    },
    {
        "question": "Welches Attribut zeigt einen Alternativtext an?",
        "answer_1": "title",
        "answer_2": "alt",
        "answer_3": "src",
        "answer_4": "longdesc",
        "right_answer": 2
    },
    {
        "question": "Welches Zeichen braucht man um einen End-Tag zu identifizieren?",
        "answer_1": "<",
        "answer_2": "*",
        "answer_3": "^",
        "answer_4": "/",
        "right_answer": 4
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('./audio/success.mp3');
let AUDIO_FAIL = new Audio('./audio/wrong.mp3');


function init() {
    document.getElementById('questions-length').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateToNextQuestion();
        updateProgressBar();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('end-screen').style = 'padding: 16px 0px';
    document.getElementById('quizcard').style = 'border: none';
    document.getElementById('length-questions').innerHTML = questions.length;
    document.getElementById('amount-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/group5.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;

}

function updateToNextQuestion() {
        let question = questions[currentQuestion];
        document.getElementById('questiontext').innerHTML = question.question;
        document.getElementById('answer_1').innerHTML = question.answer_1;
        document.getElementById('answer_2').innerHTML = question.answer_2;
        document.getElementById('answer_3').innerHTML = question.answer_3;
        document.getElementById('answer_4').innerHTML = question.answer_4;
        document.getElementById('current-question').innerHTML = currentQuestion + 1;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let rightAnswer = `answer_${question.right_answer}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(rightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }

    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == question.right_answer;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerCards();
    showQuestion();
}

function resetAnswerCards() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = './img/brainbg.jpg';
    document.getElementById('end-screen').style = 'display: none';
    document.getElementById('question-body').style = '';
    document.getElementById('quizcard').style = 'border: var(--bs-card-border-width) solid var(--bs-card-border-color);';

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}