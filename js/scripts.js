// Scripts starts here
const myTicTacToeApp = {};

myTicTacToeApp.welcomeModalOptions = function() {
    
    const welcomeModal = document.querySelector('#welcomeModal');
    const submitForm = document.querySelector('#welcome__optionsForm');

    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedMode = e.currentTarget.mode.value;
        const selectedMarker = e.currentTarget.marker.value;
        
        this.userMarker = selectedMarker;
        this.currentMode = selectedMode;
        this.closeModal(welcomeModal);
    })
}

myTicTacToeApp.getComputerMarker = () => {
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
    return Math.floor(Math.random() * 9);
}

// Gets the current date year and displays it
myTicTacToeApp.displayCurrentYear = function() {
    const footerYear = document.getElementById('year');
    footerYear.textContent = new Date().getFullYear();    
}

// Run current year function
myTicTacToeApp.init = function() {
    this.welcomeModalOptions();
    this.displayCurrentYear();
};

// When DOM is finished loading, run init
document.addEventListener('DOMContentLoaded', function() {
    myTicTacToeApp.init();
});

// Scripts ends here