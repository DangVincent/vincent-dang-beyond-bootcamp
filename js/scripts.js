// Scripts starts here
const myTicTacToeApp = {};

myTicTacToeApp.displayWelcomeModal = function() {
    
}

// Gets the date year and displays it
myTicTacToeApp.displayCurrentYear = function() {
    document.getElementById('year').innerHTML = new Date().getFullYear();    
}

myTicTacToeApp.init = function() {
    myTicTacToeApp.displayWelcomeModal();
    myTicTacToeApp.displayCurrentYear();
};

document.addEventListener('DOMContentLoaded', function(event) {
    myTicTacToeApp.init();
});

// Scripts ends here