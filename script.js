console.log("app js working");

// 10 questions and 4 options //

const questions = [
    {
        question: "When did the tradition of exchanging Valentines Day cards begin?",
        answers: [
            { text: "15th century", correct: false },
            { text: "18th century", correct: false },
            { text: "12th century", correct: false },
            { text: "19th century", correct: true },
        ]
    },

    {
        question: "Which Roman emperor is associated with the origin of Valentine's Day?",
        answers: [
            { text: "Augustus", correct: false },
            { text: "Claudius II", correct: true },
            { text: "Nero", correct: false },
            { text: "Julius Caesar", correct: false },
        ]
    },

    {
        question: "In which country did the first Valentine's Day greeting cards originate?",
        answers: [
            { text: "England", correct: true },
            { text: "France", correct: false },
            { text: "Italy", correct: false },
            { text: "Germany", correct: false },
        ]
    },

    {
        question: "What was St. Valentine's profession according to legend?",
        answers: [
            { text: "Soldier", correct: false },
            { text: "Priest", correct: true },
            { text: "Merchant", correct: false },
            { text: "Physician", correct: false },
        ]
    },

    {
        question: "Which ancient Roman festival is believed to have influenced Valentine's Day celebrations?",
        answers: [
            { text: "Saturnalia", correct: false },
            { text: "Lupercalia", correct: false },
            { text: "Feast of Lupercus", correct: true },
            { text: "Bacchanalia", correct: false },
        ]
    },

    {
        question: "Who is believed to have written the first Valentine's Day poem?",
        answers: [
            { text: "William Shakespeare", correct: false },
            { text: "Lord Byron", correct: false },
            { text: "John Keats", correct: false },
            { text: "Charles, Duke of Orleans", correct: true },
        ]
    },

    { 
        question: "Which flower became associated with Valentine's Day due to its connection with Venus, the Roman goddess of love?",
        answers: [
            { text: "Tulip", correct: false },
            { text: "Rose", correct: true },
            { text: "Daisy", correct: false },
            { text: "Lily", correct: false },
        ]
    },

    {
        question: "What is the origin of the heart shape as a symbol of love on Valentine's Day?",
        answers: [
            { text: "Ancient Greek mythology", correct: false },
            { text: "Victorian literature", correct: false },
            { text: "Medieval iconography", correct: true },
            { text: "Renaissance art", correct: false },
        ]
    },

    {
        question: "What is the significance of the color red on Valentine's Day?",
        answers: [
            { text: "Purity", correct: false },
            { text: "Friendship", correct: false },
            { text: "Prosperity", correct: false },
            { text: "Passion and love", correct: true },
        ]
    },

    {
        question: "Which Pope officially declared February 14th as Valentine's Day?",
        answers: [
            { text: "Pope Benedict XVI", correct: false },
            { text: "Pope Gelasius I", correct: true },
            { text: "Pope John Paul II", correct: false },
            { text: "Pope Francis", correct: false },
        ]
    }
];


// retrieve elements from HTML documents by their respective ID's // 

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const listItem = document.getElementById("list-item");

let currentQuestionIndex = 0;
let score = 0;

// start quiz //
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

// display questions //
function showQuestion() {
    resetState(); // reset questions & previous answers // 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    // display options (answers) //
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild); // remove all previous answers // 
    }; 
};

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    // const playerName = prompt("Enter Your Name:");
    // if (!playerName) {
    //     alert("Name can not be empty. Please try again.");
    //     return;
    // }
    // const playerScore = score;
    // addScore(playerName, playerScore);
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Let's Play Again!";
    nextButton.style.display = "block";
}

// function addScore(playerName, playerScore) {
//     listItem.textContent = `${playerName}: ${playerScore}`;
//     scoresList.appendChild(listItem);
// }


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else { 
        showScore(); // display score when all questions are answered //
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});



startQuiz(); 



// display high scores //

const scoresList = document.getElementById("scores-list");

function addScore(score) {
    const listItem = document.createElement('li');
    listItem.textContent = `Score: ${score}`;
    scoresList.appendChild(listItem);
};


