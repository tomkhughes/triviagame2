// Psuedo Coding
// 1. keep track of correct, incorrect, and unanswered questions
// 2. create function to display each question in the DOM
// 3. create function to display 4 different optional answers
// 4. set timeRemain counting down from 30 seconds
// 5. create functiuon to check if user answer is right/wrong
// 6. if the answer is correct => display CORRECT and match right image with question
// then move to next question after 5 second timeout
// 7. if answer is wrong => display WRONG! correct answer is ... and match wrong image with quesiton 
// then move to next question after 5 second timeout 
// 8. if user doesnt answer a question in 20 seconds display "Time Up" and correct answer is ...
// then move to the next question after 5 second timeout 
// 9. create a function to display the Result when user answers all questions 
// 10. Result keeps track of correct/incorrect/and unsanswerd also has a restart button 
// correct++ incorrect++ unanswered++




window.onload = function() {
  $('#startButton').show();
  $('.multipleChoice').hide();
  $('.message-section').hide();
  $('.question-panel').hide();
  $('.time-panel').hide();
  $('#resetButton').hide();
  $('.results-section').hide();
  $('.restart-button').hide();


  // $('.start-game').on('click', function() {
  //   stopwatch.start();
  // })
};

var allQuestions = [{

        question: "What player has the nickname: The Greek Freak?",
        answer: ["Giannis Antetokounmpo", "Lebron James", "Carmelo Anthony", "Stephen Curry"],
        correctAnswer: 0,
        // pic: "assets/images/.gif"

},
    {
        question: "What city did the Lakers play in before moving to L.A.?",
        answer: ["Boston", "Minneapolis", "Baltimore", "Seattle"],
        correctAnswer: 1,
        // pic: "assets/images/.gif"


    },

    {
        question: "Who led the NBA in hair colors in 1995?",
        answer: ["Michael Jordan", "Scottie Pippen", "Dennis Rodman", "Gary Payton"],
        correctAnswer: 2,
        // pic: "assets/images/.gif"


    }, 
    {
        question: "What player has the nickname: The Mailman?",
        answer: ["Kevin Durant", "Kyrie Irving", "Lebron James", "Karl Malone"],
        correctAnswer: 3,
        // pic: "assets/images/.gif"


    },       
];

// VARIABLES to keep track of the Answers 
var unanswered = 0;
var correct = 0;
var incorrect = 0;
var currentQuestion = 0; //used to keep track of what questions have been asked and move to next question
var intervalId;
var userPick;
//FUNCTIONS
function startGame() {  //use to act as a reset too
    unanswered = 0;
    correct = 0;
    incorrect = 0;
    currentQuestion = 0;
    displayQuestion();
    $('.multipleChoice').show();
    $('.question-panel').show();
    $('.restart-button').hide();


}

function startTimer() {
    var timeRemain = 5;
    $('.time-panel').show();
    $('.multipleChoice').show();
    $('.question-panel').show();
    $('.messsage-section').hide();
    $('.results-section').hide();




    function run() {
        intervalId = setInterval(decrement,1000);
    }
    function decrement() {
        timeRemain--;
        $('#timeRemain').html(timeRemain);
        if(timeRemain === 0) {
            $('#timeRemain').html('&nbsp')
            stop();
            timeOut();
        }
    }
    function stop() {
        clearInterval(intervalId);
    }
    run();
}

function displayQuestion() {

    if(currentQuestion === allQuestions.length) {
        //run result-section
        results();
    } else if(currentQuestion < allQuestions.length) {
        //Generate the question
        $('.questionAsk').html(allQuestions[currentQuestion].question);
        //Generate the multiple choice answers, with value []
        $('#zero').html(allQuestions[currentQuestion].answer[0]);
        $('#one').html(allQuestions[currentQuestion].answer[1]);
        $('#two').html(allQuestions[currentQuestion].answer[2]);
        $('#three').html(allQuestions[currentQuestion].answer[3]);
        //we want to start the timer when the question answers are loaded 
        startTimer();
        
    }

}
function timeOut() {
    $('.allMessages').html("<h2>Time Up!</h2><p>Correct Answer: "  + allQuestions[currentQuestion].answer[allQuestions[currentQuestion].correctAnswer] + "</p>");
    stop();
    $('.messsage-section').show();
    $('.multipleChoice').hide();
    $('.displayQuestion').hide();
    $('.time-panel').hide();
    $('.question-panel').hide();
    incorrect++;
    unanswered++;
    currentQuestion++;
    setTimeout (function(){
        displayQuestion()


    }, 3000);
console.log('timeOut function start')
}

function checkAnswer() {
    //stop the timer
    clearInterval(intervalId);
    //check all users picks
    if(userPick === allQuestions[currentQuestion].correctAnswer) {
        console.log('You are CORRECT');
        console.log(userPick);
    //show afterSection panel
    $('.messsage-section').show();
    $('.multipleChoice').hide();
    $('.displayQuestion').hide();
    $('.time-panel').hide();
    $('.question-panel').hide();
    $('.allMessages').html('<h2>CORRECT!</h2>')
    //show result for 3 seconds then move to next quesiton 
    correct++;
    currentQuestion++;
    setTimeout (function(){
        displayQuestion()
    }, 3000);
    } else { // if user is wrong
        console.log('You are WRONG');
        console.log(userPick);
    $('.messsage-section').show();
    $('.multipleChoice').hide();
    $('.displayQuestion').hide();
    $('.time-panel').hide();
    $('.question-panel').hide();
    $('.allMessages').html('<h2>WRONG!</h2><p>Correct Answer: ' + allQuestions[currentQuestion].answer[allQuestions[currentQuestion].correctAnswer] + '</p>')
    incorrect++;
    currentQuestion++;
    setTimeout (function(){
        displayQuestion()
    }, 3000);       
    }
console.log('checkAnswer function start')

};

function results() {
    $('.results-section').show();
    $('.displayResults').html('<h3>Correct Answers: ' + correct + '</h3><h3>Wrong Answers: ' + incorrect + '</h3><h3>Unaswered: ' + unanswered + '</h3>');
    $('.messsage-section').hide();
    $('.restart-button').show();


console.log('results function start')


}



//CLICK FUNCTIONS
$('#startButton').on('click', function() {
    $('#startButton').hide();

    startGame();
});
$('.button-choice').on('click', function() {
    userPick = parseInt($(this).attr('value'));
    checkAnswer();
});

$('.restart-button').on('click', function() {
    startGame();
});








