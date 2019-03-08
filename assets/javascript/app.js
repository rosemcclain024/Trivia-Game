// YAY PSUEDO CODING !!
//Create a start button to initialize the start of the game and timer. When you press the button you should have 10 seconds to answer each of the questions. 
// Need to create a countdown timer counting down from (10) for each question.
// When the timer hits zero the scores will be updated. 
// When the timer hits zero the user will be notified that times up!
// When creating the questions their can only be one answer for each question.
// Create a button to calculate the scores.

// QUESTIONS
var questionsArr = [{
    question: "Who does Micheal think is the WORST?",
    answerList: ["Jim", "Toby", "Angela", "Ryan"],
    correctAnswer: 1
}, {
    question: "Bears, Beets, .....",
    answerList: ["Beans", "Bananas", "Bubbles", "Battlestar Galactica"],
    correctAnswer: 3
}, {
    question: "What is Michael Scott's middle name?",
    answerList: ["Ross", "Anthony", "Gary", "Ryan"],
    correctAnswer: 2
}, {
    question: "In the Fun Run episode, what does Michael eat before they run?",
    answerList: ["fettuccine alfredo", "salad", "indian food", "chinese takeout"],
    correctAnswer: 0
}, {
    question: "What is the name of the exclusive club that Pam, Toby, and Oscar are apart of?",
    answerList: ["the boston tea party", "the finest things club", "the finer things club", "the babysitter club"],
    correctAnswer: 3
}, {
    question: "Where does The Office take place?",
    answerList: ["Atlanta", "Los Angeles", "Scranton", "Stamford"],
    correctAnswer: 2
}, {
    question: "In the first episode, what does Jim put inside a jello mold and who did it upset?",
    answerList: ["a paper weight | Phyllis", "a stapler | Angela", "a pen | Pam", "a staple | Dwight"],
    correctAnswer: 3
}, {
    question: "Who was Pam originally engaged to and how long was their engagement?",
    answerList: ["Oscar | 6 months", "Roy | 3 years", "Daryl | 5 years", "Roy | 8 years"],
    correctAnswer: 1
}, {
    question: "What is Toby's favoirte color?",
    answerList: ["Yellow", "Green", "Who cares, it's Toby", "Who is Toby"],
    correctAnswer: 2
}, {
    question: "What is everyone's favorite episode of The Office?",
    answerList: ["Stress Relief", "Niagra pt. 2" , "Scott's Totts", "Season 6 As a Whole"],
    correctAnswer: 1
}]






var gifs = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelection;
var timer = 10;
var selectedAnswer;
var messages = {
    correct: "YESH",
    incorrect: "Dwight, you ignorant slut.",
    endTime: "Time's Up!",
    finished: "Thanks, Pam."
}


//start button! plays the audio and should start the game.
$("#start-button").on("click", function() {
    console.log("hell yea");
    newGame();
})


//???
$("#startOverBtn").on("click", function(){
    $(this).hide();
    countdown();
    newGame();
});

function newGame(){
    $("#correct").empty();
    $("#incorrect").empty();
    $("#unanswered").empty();
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    currentQuestion = 0;
    nextQuestion();
}

function scoreBoardAppear() {
    $("#correct").html("<h2> Correct Answers: " + correctAnswer + "</h2>");
    $("#incorrect").html("<h2> Incorrect Answers: " + incorrectAnswer + "</h2>");
    $("#unanswered").html("<h2> Unanswered: " + unanswered + "</h2>");
}

function nextQuestion() {
    $("#messages").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();
    answered = true;


    $("#currentQuestion").html("Question #" +(currentQuestion+1)+"/"+questionsArr.length);
    $(".question").html("<h3>" + questionsArr[currentQuestion].question + "</h3>");
    for (var i=0; i<4; i++){
        var choices = $("<div>");
        choices.text(questionsArr[currentQuestion].answerList[i]);
        choices.attr({"data-index":i});
        choices.addClass("thisChoice");
        $(".answerList").append(choices);
    }

    countdown();
    $(".thisChoice").on("click", function(){
        userSelection = $(this).data("index");
        clearInterval(time)
        answerPage();
    })
}

function countdown() {
    seconds = 10;
    $("#timer").html("<h3> Time Remaining..." + seconds + "</h3>");
        answered = true;
        time = setInterval(startCountdown, 1000)

}

function startCountdown() {
    seconds--;
    $("#timer").html("<h3> Time Remaining..." + seconds + "</h3>");
        if(seconds < 1) {
            clearInterval(time);
            answered = false; 
            answerPage();
            
        }
}





function answerPage() {
    $("#currentQuestion").empty();
    $(".thisChoice").empty();
    $(".question").empty();



    var rightAnswerText = questionsArr[currentQuestion].answerList[questionsArr[currentQuestion].answer];
    var rightAnswerIndex = questionsArr[currentQuestion].correctAnswer;
    $("#gif").html('<img src = "assets/images/' + gifs[currentQuestion] + '.gif" width = "400px">');

    

    console.log(rightAnswerText);

    if((userSelection == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $("#timeRemaining").html("<h3></h3>");
        $("#finalResultMessage").html(messages.correctAnswer);
    }

    else if((userSelection != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $("#timeRemaining").html("<h3></h3>");
        $("#finalResultMessage").html(messages.incorrectAnswer);
        $("#correctedAnswer").html("The right answer was: " + rightAnswerText);
    }

    else {
        unanswered++;
        $("#timeRemaining").html("<h3></h3>");
        $("#finalResultMessage").html(messages.endTime);
        $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (questionsArr.length-1)){
        setTimeout(scoreBoardAppear, 5000);
    } else{
        currentQuestion++;
        setTimeout(nextQuestion, 5000);
    }
}

function scoreBoardAppear(){
    $("#timeLeft").empty();
    $("youAreWrongMessage").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();

    $("#finalResultMessage").html(messages.endTime);
    $("#correct").html("Correct Answers: " + correctAnswer);
    $("#incorrect").html("Incorrect Answers: " + incorrectAnswer);
    $("#unanswered").html("Unanswered: " + unanswered);
    $("#startOverBtn").addClass("reset");
    $("#startOverBtn").show();
    $("#startOverBtn").html("Start Over?");
}


