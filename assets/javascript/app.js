$(document).ready(function () {

    var mainContent = $(".question-view");
    var timeVisual = $(".time-remaining");
    var questions,
        correctAns,
        wrongAns,
        unanswered,
        currentQ,
        playerChoice,
        minutes,
        seconds;
    var startTime = 15;

    /* 
        function to set everything to the beginning of the game
    */

    function initializeGame() {
        mainContent.empty();
        questions = [];
        correctAns = 0;
        wrongAns = 0;
        unanswered = 0;
        currentQ = 0;
        startTime = 15;
        addQuestions();
        renderQuestion();
        console.log(questions);
    }

    /*=======================================
        Object constructor for my questions
    =========================================*/

    function Question(question, answerA, answerB, answerC, correct) {
        this.question = question;
        this.answers = [answerA, answerB, answerC, correct]
        this.correct = correct;

    }

    /*=======================================
        function to dynamically create questions and add them to the questions array
    =========================================*/

    function createQuestions(question, answerA, answerB, answerC, correct) {
        var quest = new Question(question, answerA, answerB, answerC, correct);
        questions.push(quest);
    }

    /*=======================================
        function that holds all of my created questions
    =========================================*/

    function addQuestions() {
        createQuestions("What is the incantation for unlocking a door?", "Wingardium Leviosa",
            "Sectumsempra",
            "Silencio",
            "Alohomora");
        createQuestions("When affected by a Dementor what should one eat?", "Broccoli",
            "Bread",
            "Soup",
            "Chocolate");
        createQuestions("What is the difference between a Werewolf and an Animagus?",
            "Nothing they are synonyms",
            "A Werewolf chooses when to transform and an Animagus does not",
            "A Werewolf is a version of an Animagus, they just chose a wolf",
            "A Werewolf is cursed and must transform, an Animagus chooses to turn into an animal");
        createQuestions("If one were to drink a Unicorn’s blood what would happen?",
            "They would get a wish",
            "They would die instantly",
            "They would turn into a Unicorn",
            "They would be kept alive indefinitely but would live a cursed life");
        createQuestions("Which one is an Unforgivable Curse?",
            "Reducto",
            "Stupefy",
            "Aguamenti",
            "Imperio");
        createQuestions("What cures most poisons?",
            "Dragon’s blood",
            "Pixie wings",
            "Polyjuice Potion",
            "A Bezoar");
        createQuestions("What is the incantation to Disarm someone?",
            "Expecto Patronum",
            "Petrificus Totalus",
            "Serpensortia",
            "Expelliarmus");
        createQuestions("How long does it take to brew a Polyjuice Potion?",
            "6 days",
            "3 hours",
            "1 year",
            "1 month");
        createQuestions("What is a Horcrux?",
            "A type of currency",
            "A sword used to destroy unbreakable items",
            "A ball used in Quidditch",
            "A fragment of a soul hidden in an object");
        createQuestions("What should one do first before approaching a Hippogriff?",
            "Wave",
            "Sing",
            "Clap",
            "Bow");
    }

    /*=======================================
        timer object that holds all of the timer functionality
    =========================================*/

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

    /*=======================================
        function to render questions to the page as long as the lst question hasn't been answered
    =========================================*/

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
            mainContent.html(div).append("<br>");
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

    /*=======================================
        function that randomly sorts the answers in the questions.answers array so that I don't have to physically change the location of the correct answer myself
    =========================================*/

    function randomizeAns() {

        questions[currentQ].answers.sort(function (a, b) {
            return 0.5 - Math.random()
        });

    }

    /*=======================================
        function that shows the correct answer after each question
    =========================================*/

    function answerScreen() {
        mainContent.empty();
        var actualAns = $("<h2>");
        actualAns.addClass("correct-answer");
        actualAns.html("The correct answer is: " + "<br>" + "<br>" + questions[currentQ].correct);
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

    /*=======================================
        function that holds the timer to move to the next question without user input
    =========================================*/

    function nextQuestion() {
        ++currentQ;
        setTimeout(renderQuestion, 2000);

    }

    /*=======================================
        function that dynamically creates the end screen
    =========================================*/

    function populateEnd() {
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

    /*=======================================
        function to show the end screen
    =========================================*/

    function endGame() {
        mainContent.empty();
        var finalScreen = $("<h2>");
        finalScreen.addClass("final-score");
        finalScreen.text("Your Total Score:");
        timeVisual.html(finalScreen);
        populateEnd();
        console.log(correctAns, wrongAns, unanswered);

    }

    $(".start-button").click(initializeGame);

    mainContent.on("click", ".answers", function () {
        playerChoice = $(this).attr("id");
        timer.stop();
        answerScreen();
        nextQuestion();
        console.log(currentQ);

    })

    $(document).on("click", ".reset-button", function () {
        initializeGame();
    })


})