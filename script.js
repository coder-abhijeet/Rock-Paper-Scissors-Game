let score = JSON.parse(localStorage.getItem('score'));

if (!score){
    score={
    wins:0,
    losses:0,
    ties:0
    };
}

function handleClick(){
    const buttonElement=document.querySelector('.auto-play-button');
    if (buttonElement.innerHTML==='Auto Play'){
        buttonElement.innerHTML='Stop';
    }
    else {
        buttonElement.innerHTML='Auto Play';
    }

}

updateScore();

let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if (!isAutoPlaying){
        intervalId=setInterval(function(){
            const playerMove= pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}

function resetScore(){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScore();
}

document.body.addEventListener('keydown',(event)=>{
    if (event.key==='Backspace'){
        resetScore();
    }
})

document.body.addEventListener('keydown',(event)=>{
    if (event.key==='r'){
        playGame('rock');
    }
    else if (event.key==='p'){
        playGame('Paper');
    }
    else if (event.key==='s'){
        playGame('Scissor');
    }
})

document.querySelector('.auto-play-button').addEventListener('click', ()=>{
    autoPlay();
})

document.querySelector('.js-rock-button').addEventListener('click',() => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',() => {
    playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click',() => {
    playGame('Scissor');
});

function playGame(playerMove){
    const computerMove=pickComputerMove();
    if (playerMove==='Scissor'){
    if (computerMove==='Rock'){
        result='You lose.';
    }
    else if (computerMove==='Paper'){
        result='You win.';
    }
    else if (computerMove==='Scissor'){
        result='Tie.';
    }
    }

    else if (playerMove==='Paper'){
    if (computerMove==='Rock'){
        result='You win.';
    }
    else if (computerMove==='Paper'){
        result='Tie.';
    }
    else if (computerMove==='Scissor'){
        result='You lose.';
    }
    }

    else if (playerMove='Rock'){
    if (computerMove==='Rock'){
        result='Tie.';
    }
    else if (computerMove==='Paper'){
        result='You lose.';
    }
    else if (computerMove==='Scissor'){
        result='You win.';
    }
    }

    if (result==='You win.'){
    score.wins+=1;
    }
    else if (result==='You lose.'){
    score.losses+=1;
    }
    else if(result==='Tie.'){
    score.ties+=1;
    }

localStorage.setItem('score',JSON.stringify(score));
updateScore();

const resultElement = document.querySelector('.js-result');
resultElement.innerHTML = `${result}`;
resultElement.style.color = result === 'You win.' ? 'lightgreen' : result === 'You lose.' ? 'tomato' : 'white';

document.querySelector('.js-move').innerHTML=`You 
<img src="Images/${playerMove}-image.webp" class="move-icon1"> <img src="Images/${computerMove}-image.webp" class="move-icon1"> Computer`;

}

function updateScore() {
    const scoreElement = document.querySelector('.js-score');
    scoreElement.innerHTML = `
        <span style="color: lightgreen;">Wins: ${score.wins}</span> 
        <span style="color: tomato;">Losses: ${score.losses}</span>
        Ties: ${score.ties}`;
}

function pickComputerMove(){
const randomNumber=Math.random();
let computerMove='';

if(randomNumber>=0 && randomNumber<1/3){
computerMove=('Rock');
} else if (randomNumber>=1/3 && randomNumber<2/3){
computerMove=('Paper');    }
else if (randomNumber>=2/3 && randomNumber<1){
computerMove=('Scissor');    }

return computerMove;
}