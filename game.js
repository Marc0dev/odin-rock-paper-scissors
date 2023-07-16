// OnClick any option we call getScore()
const options = document.querySelectorAll('.option');
options.forEach(option => option.addEventListener('click', getScore));

// Setting global variables
const message = document.querySelector('.message');
const playerScore = document.querySelector('.player-score > .score-number');
const computerScore = document.querySelector('.computer-score > .score-number');

let playerScoreNumber = 0;
let computerScoreNumber = 0;

// The setGameEnd() displays the result alert, we define the alert's button behaviour here
const playAgainButton = document.querySelector('.result-alert > button');
playAgainButton.addEventListener('click', () => { location.reload(); });


// Displays the  round result message and updates the score
function getScore() {
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice(this);

    const wordPlayerChoice = parseIndexToWord(playerChoice);
    const wordComputerChoice = parseIndexToWord(computerChoice);

    if (playerChoice === computerChoice) {
        message.textContent = `It's a Tie! You both chose ${wordPlayerChoice}`;
    } 
    // If we assign rock = 0, paper = 1, scissors = 2. Only if our choice + 1 is the others choice we lose
    // Assuming we are in a closed cicle -> 2 + 1 = 0
    else if (playerChoice + 1 === computerChoice || ( playerChoice === 2 && computerChoice === 0)) {
        message.textContent = `You Lose! ${wordComputerChoice} beats ${wordPlayerChoice}`;
        computerScoreNumber++;
        computerScore.textContent = computerScoreNumber;
        if (computerScoreNumber === 5) setGameEnd(false);
    } else {
        message.textContent = `You Win! ${wordPlayerChoice} beats ${wordComputerChoice}`;
        playerScoreNumber++;
        playerScore.textContent = playerScoreNumber;
        if (playerScoreNumber === 5) setGameEnd(true);
    }
}

// Will return integer range [0, 2]
function getComputerChoice() {
    // 0 is Rock, 1 is Paper, 2 is Scissors
    return  Math.floor(Math.random() * 3);
}

// Will return integer range [0, 2]
function getPlayerChoice(option) {
    if (option.classList.contains('rock')) return 0;
    if (option.classList.contains('paper')) return 1;
    if (option.classList.contains('scissors')) return 2;
    // If no condition is triggered [impossible]
    return -1;
}

// Displays the final result alert
function setGameEnd(hasPlayerWon) {
    const resultMessage = document.querySelector('.result-alert > h1');
    resultMessage.textContent = hasPlayerWon ? 'You Win!' : 'You Lose';

    const resultAlert = document.querySelector('.result-alert');
    resultAlert.style.transform = 'scale(1)';
}

function parseIndexToWord(index) {
    switch (index) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }
}