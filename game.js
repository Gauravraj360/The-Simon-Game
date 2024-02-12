
var userClickedPattern =[];

$('.btn').on("click touchstart",function(event){
    event.preventDefault();
    var id=$(this).attr('id');
    handleClick(id);
});

var level=0;
var started=false;
$(document).on("keydown touchstart", function(){
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

var handleClick = function(id){
    const userChosenColour= ""+id+"";
    userClickedPattern.push(userChosenColour);
    animatePress(id);
    playSound(id);
    checkAnswer(userClickedPattern.length-1);
  
}

var buttonColors=["green","red","yellow","blue"];
var gamePattern = [];

var nextSequence = function(){
    userClickedPattern=[];
    let randomNumber=Math.random();
    randomNumber=Math.round(randomNumber*3);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    document.querySelector("#"+randomChosenColor+"");
    animation(randomChosenColor);
    playSound(randomChosenColor);
    level++;
    $("#level-title").html("Level "+level+"");
}


var animatePress= function(currentColor){
    $('.'+currentColor+'').addClass("pressed");
    setTimeout(function(){
        $('.'+currentColor+'').removeClass("pressed");
    },100)
}

var playSound=function(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

var animation= function(button){
    
    $("#"+button).animate({
        opacity:'0.1'
    },"fast").animate({
        opacity:'1'
    },"fast");

}
 
var checkAnswer =function(currentLevel){
   
    var lastAnswer=userClickedPattern[currentLevel]; 
   
    if(lastAnswer===gamePattern[currentLevel]) {
        console.log("success");
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if(gamePattern.length===currentLevel+1){
    setTimeout(function(){
        nextSequence();
    },1000);
    
    }  
   
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false; 
}
