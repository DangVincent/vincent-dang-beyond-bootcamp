// Scripts starts here
const myTicTacToeApp = {};

// Handle welcome form inputs when user submits
myTicTacToeApp.handleWelcomeModalOptions = function() {
    const welcomeModal = document.querySelector('#welcomeModal');
    const submitForm = document.querySelector('#welcomeOptionsForm');

    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedMode = e.currentTarget.mode.value;
        const selectedMarker = e.currentTarget.marker.value;
        
        this.numOfSpotsTaken = 0;
        this.userMarker = selectedMarker;
        this.currentMode = selectedMode;
        this.closeModal(welcomeModal);
    })
}

myTicTacToeApp.disableButton = function(button) {
    button.classList.add('disabled');
    button.disabled = true;
}

// Handle user button clicks function
myTicTacToeApp.handleUserButtonClick = function() {
    myTicTacToeApp.numOfSpotsTaken += 1;
    myTicTacToeApp.disableButton(this);
    this.textContent = myTicTacToeApp.userMarker;
    myTicTacToeApp.handleComputerEvents();
}

// Handle grid buttons by setting click events for each of them
myTicTacToeApp.handleGridButtons = function() {

    const gameGridButtons = document.querySelectorAll('.gameGrid__button');

    gameGridButtons.forEach(button => {
        button.addEventListener('click', this.handleUserButtonClick);
    });
}

myTicTacToeApp.handleComputerEvents = function() {
    if (this.currentMode === "easy") {
        this.easyMode();
    }
    else {
        this.hardMode();
    }
}

myTicTacToeApp.easyMode = function() {
    const computerMarker = this.getComputerMarker();
    const randomNum = this.getRandomNumber();
    const gridCell = document.getElementById(`cell${randomNum}`);

    if (!gridCell.textContent) {
        this.numOfSpotsTaken += 1;
        this.disableButton(gridCell);
        gridCell.textContent = computerMarker;
    }
    else if (gridCell.textContent && this.numOfSpotsTaken < 8){
        this.handleComputerEvents();
    }
}

myTicTacToeApp.hardMode = function() {

}

// Get computer marker based on user selected marker
myTicTacToeApp.getComputerMarker = function() {
    let computerMarker = '';

    if (this.userMarker === 'x') {
        computerMarker = 'o';
    }
    else {
        computerMarker = 'x';
    }

    return computerMarker;
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
    return Math.floor(Math.random() * 9) + 1;
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