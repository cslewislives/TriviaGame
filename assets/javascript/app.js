$(document).ready(function () {

    var questions = [];
    var mainContent = $(".question-view");
    var timeVisual = $(".time-remaining");
    var playerChoice;
    var correctAns = 0,
        wrongAns = 0,
        unanswered = 0,
        currentQ = 0;
    var minutes, seconds;
    var startTime = 15;


    function Question(question, answerA, answerB, answerC, correct) {
        this.question = question;
        this.answers = [answerA, answerB, answerC, correct]
        this.correct = correct;

    }

    function createQuestions(question, answerA, answerB, answerC, correct) {
        var quest = new Question(question, answerA, answerB, answerC, correct);
        questions.push(quest);
    }

    function addQuestions() {
        createQuestions("Question 1?", "Answer A", "Answer B", "Answer C", "Correct Answer");
        createQuestions("Question 2?", "Answer X", "Answer Y", "Answer Z", "Correct Answer");
        createQuestions("Question 3?", "Answer D", "Answer C", "Answer E", "Correct Answer");
        createQuestions("Question 4?", "Answer F", "Answer G", "Answer H", "Correct Answer");
        createQuestions("Question 5?", "Answer J", "Answer K", "Answer L", "Correct Answer");
    }

    var timer = {
        
        time: startTime,

        start: function () {
            countdown = setInterval(timer.decrement, 1000);
        },

        decrement: function () {

            minutes = Math.floor(timer.time / 60);
            seconds = timer.time - (minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            timer.render();
            if (timer.time === 0) {
                timer.stop();
                answerScreen();
                nextQuestion();
                unanswered++;
            }
            timer.time--;
        },

        stop: function () {
            clearInterval(countdown);
            timer.time = startTime;
        },

        render: function () {

            showTime = $("<h3>");
            showTime.addClass("time-remaining");
            showTime.text("Time Remaining: " + minutes + ":" + seconds);
            timeVisual.html(showTime);

        }
    }

    function renderQuestion() {
        startTime = 15;
        if (currentQ >= questions.length) {
            endGame();
        } else {
            randomizeAns();
            timer.decrement();
            timer.start();
            var div = $("<h2>");
            div.addClass("question");
            div.text(questions[currentQ].question);
            mainContent.html(div);
            console.log(questions[currentQ].question);
            for (let i of questions[currentQ].answers) {
                var answer = $("<div>");
                answer.addClass("btn btn-default answers");
                answer.text(i);
                mainContent.append(answer).append("<br>").append("<br>");
                if (i === questions[currentQ].correct) {
                    answer.attr("id", "correct");
                } else {
                    answer.addClass("wrong");
                }
            }
        }

    }

    function randomizeAns() {

        questions[currentQ].answers.sort(function (a, b) {
            return 0.5 - Math.random()
        });

    }


    function answerScreen() {
        mainContent.empty();
        var actualAns = $("<h2>");
        actualAns.addClass("correct-answer");
        actualAns.text(questions[currentQ].correct);
        mainContent.html(actualAns);
        console.log(questions[currentQ].correct);
        if (playerChoice === "correct") {
            winLose = $("<h2>");
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
        correctAns = 0;
        wrongAns = 0;
        unanswered = 0;
        currentQ = 0;
        startTime = 15;
        addQuestions();
        renderQuestion();
        console.log(questions);
        //player presses start and the first question appears
        //there is a certain amount of time per question
        //player has multiple choices to choose from

    }

    function nextQuestion() {
        ++currentQ;
        setTimeout(renderQuestion, 2000);

    }


    $(".start-button").click(initializeGame);

    //when player chooses an option player is shown correct answer and if they got it right
    mainContent.on("click", ".answers", function () {
        playerChoice = $(this).attr("id");
        timer.stop();
        answerScreen();
        //with no input the app goes to the next question
        nextQuestion();
        console.log(currentQ);

    })

    function populateEnd() {
        //once all questions are finished player is shown amount correct/incorrect/unanswered
        var correctTotal = $("<h3>");
        correctTotal.addClass("totals");
        correctTotal.text("Answered Correctly: " + correctAns);
        mainContent.html(correctTotal).append("<br>");

        var wrongTotal = $("<h3>");
        wrongTotal.addClass("totals");
        wrongTotal.text("Answered Incorrectly: " + wrongAns);
        mainContent.append(wrongTotal).append("<br>");

        var unansweredTotal = $("<h3>");
        unansweredTotal.addClass("totals");
        unansweredTotal.text("Unanswered: " + unanswered);
        mainContent.append(unansweredTotal).append("<br>");

        var resetBtn = $("<button>");
        resetBtn.addClass("btn btn-default reset-button");
        resetBtn.text("Try Again?");
        mainContent.append(resetBtn);
    }

    function endGame() {
        mainContent.empty();
        var finalScreen = $("<h2>");
        finalScreen.addClass("final-score");
        finalScreen.text("Your Total Score");
        timeVisual.html(finalScreen);
        populateEnd();
        console.log(correctAns, wrongAns, unanswered);

    }

    function reset() {
        mainContent.empty();
        correctAns = 0;
        wrongAns = 0;
        unanswered = 0;
        currentQ = 0;
        startTime = 15;
        renderQuestion();
        console.log(questions);
    }

    //player can click reset button
    $(document).on("click", ".reset-button", function() {
        //button restarts game but does not reload the page.
        event.preventDefault();
        reset();
    })


})