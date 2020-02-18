// Scripts starts here
const myTicTacToeApp = {};

// Handle welcome form inputs when user submits
myTicTacToeApp.handleWelcomeModalOptions = function() {
    const welcomeModal = document.getElementById('welcomeModal');
    const submitForm = document.getElementById('welcomeOptionsForm');

    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const { mode, marker } = e.currentTarget;
        const selectedMode = mode.value;
        const selectedMarker = marker.value;
        
        this.numOfSpotsTaken = 0;
        this.userMarker = selectedMarker;
        this.currentMode = selectedMode;
        this.userMoves = [];
        this.computerMoves = [];
        this.closeModal(welcomeModal);
        this.setComputerMarker();
    })
}

// Disable button after user clicks and remove styling
myTicTacToeApp.disableButton = function(button) {
    button.classList.add('disabled');
    button.disabled = true;
}

// Handle user button clicks function
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

    const gameGridButtons = document.querySelectorAll('.gameGrid__button');
    this.gameGridButtons = gameGridButtons;

    gameGridButtons.forEach(button => {
        button.addEventListener('click', this.handleUserButtonClick);
    });
}

// Handle computer events based on selected mode
myTicTacToeApp.handleComputerEvents = function() {
    if (this.currentMode === "easy" && !this.winner) {
        this.easyMode();
    }
    else {
        this.hardMode();
    }
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

myTicTacToeApp.checkWin = function(moves, player) {
    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const res = winCombinations.filter(combination => combination.filter(num => {
        return moves.indexOf(num) > -1;
    }).length === 3);
    if (res.length) {
        this.winner = player;
        this.handleWinnerOptions();
    }
    else if (!res.length && this.numOfSpotsTaken === 9) {
        this.handleWinnerOptions();
    }
}

myTicTacToeApp.handleWinnerOptions = function() {
    const winnerModal = document.getElementById('winnerModal');
    const winner = document.getElementById('playerWinner');
    let text;
    if (this.winner === 'you') {
        text = `${this.winner} win!`
    }
    else if (this.winner === 'computer') {
        text = `${this.winner} wins!`;
    }
    else {
        text = `it's a draw`;
    }
    winner.textContent = text;
    this.openModal(winnerModal);
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
    const footerYear = document.getElementById('year');
    footerYear.textContent = new Date().getFullYear();    
}

// Run current year function
myTicTacToeApp.init = function() {
    this.handleWelcomeModalOptions();
    this.handleGridButtons();
    this.displayCurrentYear();
};

// When DOM is finished loading, run init
document.addEventListener('DOMContentLoaded', function() {
    myTicTacToeApp.init();
});

// Scripts ends here