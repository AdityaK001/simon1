var gamePattern=[];
var userClickedPattern=[];
const buttonColours =["red", "blue", "green", "yellow"];
var level =0;




$(document).keypress(function(){
    if (level===0){
        nextsequence();
    }
});

$('[type="button"]').click(function(evt)
{   
    if (level===0){gameover();}
    else{
    var userChosenColour=evt.target.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern=userClickedPattern.concat(userChosenColour);
    checkpattern(gamePattern,userClickedPattern);}


});

function checkpattern(gameCol,userCol){
    if ((gameCol.length >=userCol.length)&& (level!=0)){
        let i=userCol.length-1;
        while (i<userCol.length) {
            if(gameCol[i]===userCol[i]){
                i=i+1;
            }
            else {
                gameover();
                break;
            }
        }
        if ((gameCol.length===userCol.length) && (level!=0)){
            userClickedPattern.length=0;
            setTimeout(nextsequence(),5000);
        }
        

    }
}

function gameover(){
    var gameoveraudio= new Audio('sounds/wrong.mp3');
    gameoveraudio.play();
    level=0;
    $('h1').html('Game Over! Restart by pressing any keyboard button');
    gamePattern.length = 0;
    userClickedPattern.length = 0;
}

function nextsequence(){
    var randomNumber= Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern=gamePattern.concat(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    var color= new Audio('sounds/'+randomChosenColour+'.mp3')
    color.play();
    level=level+1;
    $('h1').html('Level'+' '+level);
}

function playSound(name) {
    var color= new Audio('sounds/'+name+'.mp3');
    color.play();
}

function animatePress(currentColour) {
    $('.'+currentColour).addClass('pressed');
    setTimeout(function(){$('.'+currentColour).removeClass('pressed');},100);
}

