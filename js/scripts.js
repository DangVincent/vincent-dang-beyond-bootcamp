// Scripts starts here
const myTicTacToeApp = {};

// Selectors
myTicTacToeApp._welcomeModal;
myTicTacToeApp._winnerModal;
myTicTacToeApp._welcomeSubmitForm;
myTicTacToeApp._winner;
myTicTacToeApp._yesButton;
myTicTacToeApp._noButton;
myTicTacToeApp._footerYear;
myTicTacToeApp._gameGridButtons;
myTicTacToeApp.numOfSpotsTaken = 0;
myTicTacToeApp.userMoves = [];
myTicTacToeApp.computerMoves = [];
myTicTacToeApp.winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Handle welcome form inputs when user submits
myTicTacToeApp.handleWelcomeModalOptions = function() {
    this._welcomeSubmitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const { mode, marker } = e.currentTarget;
        const selectedMode = mode.value;
        const selectedMarker = marker.value;
        
        this.userMarker = selectedMarker;
        this.currentMode = selectedMode;
        this.closeModal(this._welcomeModal);
        this.setComputerMarker();
    })
}

// Disable button after user clicks and remove styling
myTicTacToeApp.disableButton = function(button) {
    button.classList.add('disabled');
    button.disabled = true;
}

// Enable button after user plays again and add styling
myTicTacToeApp.enableButton = function(button) {
    button.classList.remove('disabled');
    button.disabled = false;
}

// Handle user button clicks on game grid
myTicTacToeApp.handleUserButtonClick = function() {
    this.textContent = myTicTacToeApp.userMarker;
    myTicTacToeApp.userMoves.push(parseInt(this.id[this.id.length - 1]));    
    myTicTacToeApp.numOfSpotsTaken += 1;
    myTicTacToeApp.disableButton(this);
    myTicTacToeApp.checkWin(myTicTacToeApp.userMoves, 'you');
    myTicTacToeApp.handleComputerEvents();
}

// Handle grid buttons by setting click events for each of them
myTicTacToeApp.handleGridButtons = function() {
    this._gameGridButtons.forEach(button => {
        button.addEventListener('click', this.handleUserButtonClick);
    });
}

// Handle computer events based on selected mode
myTicTacToeApp.handleComputerEvents = function() {
    (this.currentMode === "easy" && !this.winner) ? this.easyMode() : this.hardMode();
}

// Handles computer decision when user selects easy mode
myTicTacToeApp.easyMode = function() {
    const randomNum = this.getRandomNumber();
    const gridCell = document.getElementById(`cell${randomNum}`);

    if (!gridCell.textContent) {
        this.numOfSpotsTaken += 1;
        this.disableButton(gridCell);
        this.computerMoves.push(randomNum);
        this.checkWin(this.computerMoves, 'computer');
        gridCell.textContent = this.computerMarker;
    }
    else if (gridCell.textContent && this.numOfSpotsTaken < 8){
        this.easyMode();
    }
}

// Handles computer decision when user selects hard mode
myTicTacToeApp.hardMode = function() {

}

// Check whether the user or computer won or tied
myTicTacToeApp.checkWin = function(moves, player) {
    const res = this.winCombinations.filter(combination => combination.filter(num => {
        return moves.indexOf(num) > -1;
    }).length === 3);
    
    if (res.length) {
        this.winnerName = player;
        this.handleWinnerOptions();
    }
    else if (!res.length && this.numOfSpotsTaken === 9) {
        this.handleWinnerOptions();
    }
}

// Display winner modal when a player wins
myTicTacToeApp.handleWinnerOptions = function() {
    let text;
    if (this.winnerName === 'you') {
        text = `${this.winnerName} win!`
    }
    else if (this.winnerName === 'computer') {
        text = `${this.winnerName} wins!`;
    }
    else {
        text = `it's a draw`;
    }
    this._winner.textContent = text;
    this.openModal(this._winnerModal);
}

// Handle user buttons clicks when user decides to play again
myTicTacToeApp.handlePlayAgainButtons = function() {
    this._yesButton.addEventListener('click', this.playAgain);
    this._noButton.addEventListener('click', this.quitGame);
}

// Reset values when user clicks yes to play again
myTicTacToeApp.playAgain = function() {
    myTicTacToeApp.resetValues();
    myTicTacToeApp.closeModal(myTicTacToeApp._winnerModal);
}

// Reset the game when user clicks no to quit
myTicTacToeApp.quitGame = function() {
    myTicTacToeApp.currentMode = null;
    myTicTacToeApp.userMarker = null;
    myTicTacToeApp.computerMarker = null;
    myTicTacToeApp.resetValues();
    myTicTacToeApp.openModal(myTicTacToeApp._welcomeModal);
    myTicTacToeApp.closeModal(myTicTacToeApp._winnerModal);
}

// Reset values when user plays again or not
myTicTacToeApp.resetValues = function() {
    myTicTacToeApp.computerMoves = [];
    myTicTacToeApp.numOfSpotsTaken = null;
    myTicTacToeApp.userMoves = [];
    myTicTacToeApp.winnerName = null;
    myTicTacToeApp._gameGridButtons.forEach(button => {
        button.textContent = null;
        myTicTacToeApp.enableButton(button);
    });
}

// Get computer marker based on user selected marker
myTicTacToeApp.setComputerMarker = function() {
    this.userMarker === 'x' 
    ? this.computerMarker = 'o' 
    : this.computerMarker = 'x';
}

// Open a modal function
myTicTacToeApp.openModal = function(modal) {
    modal.style.display = "block";
}

// Close a modal function
myTicTacToeApp.closeModal = function(modal) {
    modal.style.display = "none";
}

// Generate a random number function
myTicTacToeApp.getRandomNumber = function() {
    return Math.floor(Math.random() * 8) + 0;
}

// Gets the current date year and displays it
myTicTacToeApp.displayCurrentYear = function() {
    this._footerYear.textContent = new Date().getFullYear();    
}

// Run current year function
myTicTacToeApp.init = function() {
    this._welcomeModal = document.getElementById('welcomeModal');
    this._winnerModal = document.getElementById('winnerModal');
    this._welcomeSubmitForm = document.getElementById('welcomeOptionsForm');
    this._gameGridButtons = document.querySelectorAll('.gameGrid__button');
    this._winner = document.getElementById('playerWinner');
    this._yesButton = document.getElementById('yes');
    this._noButton = document.getElementById('no');
    this._footerYear = document.getElementById('year');
    this.handleWelcomeModalOptions();
    this.handleGridButtons();
    this.handlePlayAgainButtons();
    this.displayCurrentYear();
};

// When DOM is finished loading, run init
document.addEventListener('DOMContentLoaded', function() {
    myTicTacToeApp.init();
});

// Scripts ends here