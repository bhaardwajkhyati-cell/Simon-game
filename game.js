var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level;

$(document).keypress(function() {
  if (!started) {
    level = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//for computer activity
function nextSequence() {
 userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}




function playSound(name){
var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}





// for user activity
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $("#" + userChosenColor).fadeOut(100).fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);
console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length -1);
});

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
   setTimeout(function() {
     $("#" + currentColour).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
        nextSequence();
        } , 1000);
      }
    }  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("press any key to restart the game");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

      startOver();
  }

}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }

  $("#refresh-btn").click(function() {
    startOver(); // reset variables
  nextSequence(); // start the game
  started = true;
   });










