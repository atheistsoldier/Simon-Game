
var gameButtons = ['green', 'red', 'yellow', 'blue'];

var game = false;
var steps = [];
var userClickedPattern = [];
var level = 0;
$(document).keydown(function () {
    if (!game) {


        $('#level-title').text("Level " + level);
        nextSequence();
        game = true;
    }
});

$(".btn").click(function () {
    var userChosenButton = $(this).attr("id");
    userClickedPattern.push(userChosenButton);
    makeSound(userChosenButton);
    buttonAnimation(userChosenButton);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLength) {

    if (steps[currentLength] === userClickedPattern[currentLength]) {
        if (userClickedPattern.length === steps.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    }
    else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $('#level-title').text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = gameButtons[randomNumber];
    steps.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    

}
function buttonAnimation(key) {
    var activeButton = $("." + key);
    activeButton.addClass("pressed");
    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}
function makeSound(key) {


    var audio1 = new Audio("sounds/" + key + ".mp3");
    audio1.play();


}

function startOver() {
    game = false;
    steps = [];
    level = 0;
 
}
