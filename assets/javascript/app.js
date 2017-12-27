$(document).ready(function () {

    var questions = [];
    var timer = 29;

    // initializeGame();

    function Question(question, answerA, answerB, answerC, correct) {
        this.question = question;
        this.answers = [answerA, answerB, answerC, correct]

    }

    function addQuestions(question, answerA, answerB, answerC, correct) {
        var quest = new Question(question, answerA, answerB, answerC, correct);
        questions.push(quest);
    }

    function createQuestions() {
        addQuestions("Question 1?", "Answer A", "Answer B", "Answer C", "Correct Answer");
        addQuestions("Question 2?", "Answer A", "Answer B", "Answer C", "Correct Answer");
        addQuestions("Question 3?", "Answer D", "Answer C", "Answer E", "Correct Answer");
        addQuestions("Question 4?", "Answer F", "Answer G", "Answer H", "Correct Answer");
        addQuestions("Question I?", "Answer J", "Answer K", "Answer L", "Correct Answer");
    }

    function startTimer() {
        countdown = setInterval(decrement, 1000);
    }
    console.log(timer);

    function decrement() {
        showTime = $("<h3>");
        showTime.addClass("time-remaining");
        showTime.text("Time Remaining: " + timer);
        $(".time-remaining").html(showTime);
        
        
        --timer;
        
        if (timer === 0) {
            stop();
        }
    }
    
    function stop() {
        clearInterval(countdown);
    }
    
    function initializeGame() {
        $(".question-view").empty();
        
        startTimer();
        showTime = $("<h3>");
        showTime.addClass("time-remaining");
        showTime.text("Time Remaining: " + timer);
        $(".time-remaining").html(showTime);

        createQuestions();
        console.log(questions);


        var div = $("<h2>");
        div.addClass("question");
        div.text(questions[0].question);
        $(".question-view").html(div);
        console.log(questions[0].question);

        for (let i of questions[0].answers) {
            var answer = $("<p>");
            answer.addClass("answers");
            answer.text(i);
            $(".question-view").append(answer);
        }

        
        
        //player presses start and the first question appears
        
    }
    $(".start-button").click(initializeGame);
    //there is a certain amount of time per question
    //player has multiple choices to choose from
    //when player chooses an option player is shown correct answer and if they got it right
    //with no input the app goes to the next question
    //clock is reset
    //if player does not choose an answer in the time given player is shown correct answer
    //once all questions are finished player is shown amount correct/incorrect/unanswered
    //timer is stopped
    //player can click reset button
    //button restarts game but does not reload the page.




})