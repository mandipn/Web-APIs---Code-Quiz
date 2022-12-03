// adding 10 questions as array within the variable

var questions = [{
    q: "1. What is the smallest country in the world with an area of only 0.49 square kilometres?",
    a: "1. Monaco",
    b: "2. Vatican",
    c: "3. Andorra",
    d: "4. Italy",
    correct: "2. Vatican",
},

{
    q: "2. The 'function' and 'var' are known as:?",
    a: "1. Keywords",
    b: "2. Data types",
    c: "3. Declaration statements",
    d: "4. Prototypes",
    correct: "3. Declaration statements",
},

{
    q: "3. Which of the following is a landlocked country, meaning it is not bordered by the sea or ocean?",
    a: "1. Kazakhstan",
    b: "2. Madagascar",
    c: "3. Turkey",
    d: "4. United Kingdom",
    correct: "1. Kazakhstan",
},

{
    q: "4. The correct sequence of HTML tags for starting a webpage is -",
    a: "1. Head, Title, HTML, body",
    b: "2. HTML, Body, Title, Head",
    c: "3. HTML, Title, Body, Head",
    d: "4. HTML, Head, Title, Body",
    correct: "4. HTML, Head, Title, Body",
},

{
    q: "5. In the UK, the abbreviation NHS stands for National what Service",
    a: "1. Humanity",
    b: "2. Health",
    c: "3. House",
    d: "4. Hoop",
    correct: "2. Health",
},

{
    q: "6. What does JSON stand for?",
    a: "1. Java Steps On Now",
    b: "2. Just Scripts On New",
    c: "3. Java Script Object Notation",
    d: "4. Java Script On Node",
    correct: "3. Java Script Object Notation",
},

{
    q: "7. What does BMW stand for",
    a: "Best Motor Works",
    b: "Be My Way",
    c: "Bavarian Motor Works",
    d: "Bomb-down Motor Way",
    correct: "Bavarian Motor Works",
},

{
    q: "8. Which type of language is JavaScript?",
    a: "1. Object-Oriented",
    b: "2. Object-Based",
    c: "3. Assembly-language",
    d: "4. High-level",
    correct: "2. Object-Based",
},

{
    q: "9. Which boxer did Muhammad Ali fight in ‘The Rumble in the Jungle’?",
    a: "1. Rocky Balboa",
    b: "2. George Foreman",
    c: "3. Mike Tyson",
    d: "4. Mandip Nijor",
    correct: "2. George Foreman",
},

{
    q: "10. How can we change the background color of an element?",
    a: "1. background-color",
    b: "2. color",
    c: "3. both 1 and 2",
    d: "4. none of the above",
    correct: "1. background-color",
}

];

// adding the 5 variables to get the timer to work

var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 60;
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

//adding a function called timer with reference to the above variables in the code

function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
}

// adding a function called adjustTime to display and react according to time left

function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
}

//starting the timer when the start button is clicked

clickStart.onclick = timer;
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";

// displaying the question after the start button is clicked

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

// displaying the 4 options per question and recording the result of the option user selects    

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

 // inserting new nodes in DOM by using appendChild   

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

// creating the default variables in order to show the user the outcome of their answer and moving to the new question

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;

// to determine if answer is wrong or correct and then displaying the outcome to the user

   var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjustTime(-5);
        answerDetermination.textContent = "Wrong! - you just lost 5 seconds!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

// resetting the display once the questions have finished and next steps

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    questionContainer.innerHTML="";
    document.querySelector("#intro-page").style.display = "none";
}

// capturing the highest score and name and displaying this back ot the user

function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + " " + score;
}
clickViewScores.addEventListener("click", () => {
    highScores();
})

var initials; 
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";

    endPage.innerHTML = "You are all done! Your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
    
        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuizPage);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

clickStart.addEventListener('click', quiz);