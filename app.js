/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/


// Access DOM Elements

const playerScore = document.querySelectorAll('.player-score');
const playerCurrentScore = document.getElementsByClassName('player-current-score');
const image = document.querySelector('.dice');
// const image1 = document.querySelector('.dice1');


//Global variables
var score, active, global, stateVariable,win;


init();

// New Game EventListener
document.querySelector('.btn-new').addEventListener('click', init);

// ROLL Dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(stateVariable){
        var random = Math.floor(1 + Math.random() * 6);        
        if(random !== 1) {
            score = score + random;
            document.querySelector('#current-' + active).innerHTML = score;
            image.src = 'images/dice-' + random + '.png';
            image.style.display = 'block';
        }
        else {
            score = 0;
            image.style.display = 'none';          
            nextPlayer();
        }
    }

});


// HOLD Score
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(stateVariable){
        global[active] += score;
        
        
            if (global[active] >= 50) {
                //WINNER
                document.querySelector('#score-' + active).innerHTML = global[active];
                document.querySelector('#name-' + active).innerHTML = "WINNER!!!";
                image.style.display = 'none';
                document.querySelector('.player-' + active + '-panel').classList.add('winner');
                document.querySelector('.player-' + active + '-panel').classList.remove('active');
                stateVariable = false;

            }
            else {
                document.querySelector('#score-' + active).innerHTML = global[active];
                score = 0;
                nextPlayer();
            }
    }
});


// Next Player
function nextPlayer(){
    document.querySelector('#current-' + active).innerHTML = 0;
    document.querySelector('.player-' + active + '-panel').classList.toggle('active');
    image.style.display = 'none';
    active === 0 ? active = 1 : active = 0;
    document.querySelector('.player-' + active + '-panel').classList.toggle('active');
    
}

// Game initialization function
function  init() {
    global = [0, 0];
    score = 0;    
    active = 0;
    stateVariable = true;
    playerScore[0].textContent = score;
    playerScore[1].textContent = score;
    playerCurrentScore[0].textContent = score;
    playerCurrentScore[1].textContent = score;
    image.style.display = 'none';
    
    
    document.querySelector('#name-0').innerHTML = 'PLAYER 1';
    document.querySelector('#name-1').innerHTML = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');    
        
}

