// OnClick button the game will start
let playButton = document.querySelector('.play');
playButton.addEventListener('click', startGame);

function getComputerChoice() {
    // Returns a number between 0 and 2 inclusive
    // 0 is Rock, 1 is Paper, 2 is Scissors
    return  Math.floor(Math.random() * 3);
}

// Will return integer range [-1, 2] (-1 equates none-of-the-allowed-values)
function getPlayerChoice(currentGame, maxGames) {
    let textChoice = prompt(`What will be your choice, Rock Paper or Scissors? (${currentGame}/${maxGames})`);
    //Only true if we press the Cancel button
    if (textChoice == null) { return null; }

    textChoice = textChoice.toLowerCase();
    if (textChoice !== 'rock' && textChoice !== 'paper' && textChoice !== 'scissors') {
        console.log("That's not an option! Check your spelling");
        return -1;
    } else {
        return parseWordToIndex(textChoice);
    }
}

// Will return integer range [-1 0 1] (Lose Tie Win)
function playRound(playerSelection, computerSelection) {
    let wordPlayerSelection = parseIndexToWord(playerSelection);
    let wordComputerSelection = parseIndexToWord(computerSelection);

    if (playerSelection === computerSelection) {
        console.log(`It's a Tie! You both chose ${wordPlayerSelection}`);
        return 0;
    } 
    // If we assign rock = 0, paper = 1, scissors = 2. Only if our choice + 1 is the others choice we lose
    // Assuming we are in a closed cicle -> 2 + 1 = 0
    else if (playerSelection + 1 === computerSelection || ( playerSelection === 2 && computerSelection === 0)) {
        console.log(`You Lose! ${wordComputerSelection} beats ${wordPlayerSelection}`);
        return -1;
    } else {
        console.log(`You Win! ${wordPlayerSelection} beats ${wordComputerSelection}`);
        return 1;
    }
}

function startGame() {
    const maxGames = prompt("How many games do you want to play? (1 - 10)");

    // Stops the game if the player selects Cancell
    if (maxGames == null) { return; }
    if (isNaN(parseInt(maxGames)) || parseInt(maxGames) < 0 || parseInt(maxGames) > 10) {
        console.log("That's not an option! Next time select an aviable number");
        return;
    }

    let playerWins = 0;

    for(let i = 1; i <= maxGames; i++) {
        let computerSelection = getComputerChoice();
        let playerSelection;
        do {
            playerSelection = getPlayerChoice(i, maxGames);
        } while (playerSelection === -1);

        // Breaks if the player selects Cancell
        if (playerSelection === null) { break; }

        playerWins += playRound(playerSelection, computerSelection);
    }

    if (playerWins == 0) {
        console.log("It's a Tie! You both have the same punctuacion");
    } else if(playerWins > 0) {
        console.log("You Win! Congratulations, you have more victories");
    } else {
        console.log("You Lose! The opponent has more victories than you");
    }
    
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

function parseWordToIndex(word) {
    switch (word.toLowerCase()) {
        case 'rock':
            return 0;
        case 'paper':
            return 1;
        case 'scissors':
            return 2;
    }
}
