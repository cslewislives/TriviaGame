$(document).ready(function () {

    var questions = [];
    var timer = 29;
    var mainContent = $(".question-view");
    var timeVisual = $(".time-remaining");
    var playerChoice;
    var correctAns = 0;
    var wrongAns = 0;
    var unanswered = 0;

    // initializeGame();

    function Question(question, answerA, answerB, answerC, correct) {
        this.question = question;
        this.answers = [answerA, answerB, answerC, correct]

    }

    function createQuestions(question, answerA, answerB, answerC, correct) {
        var quest = new Question(question, answerA, answerB, answerC, correct);
        questions.push(quest);
    }

    function addQuestions() {
        createQuestions("Question 1?", "Answer A", "Answer B", "Answer C", "Correct Answer");
        createQuestions("Question 2?", "Answer A", "Answer B", "Answer C", "Correct Answer");
        createQuestions("Question 3?", "Answer D", "Answer C", "Answer E", "Correct Answer");
        createQuestions("Question 4?", "Answer F", "Answer G", "Answer H", "Correct Answer");
        createQuestions("Question I?", "Answer J", "Answer K", "Answer L", "Correct Answer");
    }

    function startTimer() {
        countdown = setInterval(decrement, 1000);
    }
    console.log(timer);

    function decrement() {
        renderTimer();
        
        --timer;
        
        if (timer === 0) {
            stop();
        }
    }
    
    function stop() {
        clearInterval(countdown);
    }

    function renderTimer() {

        showTime = $("<h3>");
        showTime.addClass("time-remaining");
        showTime.text("Time Remaining: " + timer);
        timeVisual.html(showTime);
    
    }

    function renderQuestion() {

        var div = $("<h2>");
        div.addClass("question");
        div.text(questions[0].question);
        mainContent.html(div);
        console.log(questions[0].question);
    
        for (let i of questions[0].answers) {
            var answer = $("<div>");
            answer.addClass("btn btn-default answers");
            answer.text(i);
            mainContent.append(answer).append("<br>");
            if (i === questions[0].answers[3]) {
                answer.attr("id", "correct");
            } else {
                answer.addClass("wrong");
            }
        }
    
    }

    function answerScreen() {
        mainContent.empty();
        var actualAns = $("<h2>");
        actualAns.addClass("correct-answer");
        actualAns.text(questions[0].answers[3]);
        mainContent.html(actualAns);
        console.log(questions[0].answers[3]);
        if (playerChoice === "correct") {
            var winLose = $("<h2>");
            winLose.addClass("win-lose");
            winLose.text("You are Correct!!");
            timeVisual.html(winLose);
            console.log("correct");
            ++correctAns;
        } else {
            var winLose = $("<h2>");
            winLose.addClass("win-lose");
            winLose.text("Maybe Next Time....");
            timeVisual.html(winLose);
            ++wrongAns;
        }
        console.log(playerChoice)
    }
    
    function initializeGame() {
        mainContent.empty();
        
        startTimer();
        renderTimer();
        addQuestions();
        renderQuestion();
        console.log(questions);
        //player presses start and the first question appears
        //there is a certain amount of time per question
        //player has multiple choices to choose from
        
    }
    $(".start-button").click(initializeGame);

    //when player chooses an option player is shown correct answer and if they got it right
    mainContent.on("click", ".answers", function() {
        playerChoice = $(this).attr("id");
        stop();
        answerScreen();
        console.log(playerChoice)
        
    })
    //with no input the app goes to the next question
    //clock is reset
    //if player does not choose an answer in the time given player is shown correct answer
    //once all questions are finished player is shown amount correct/incorrect/unanswered
    //timer is stopped
    //player can click reset button
    //button restarts game but does not reload the page.




})