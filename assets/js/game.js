// Hidden Game Elements.
document.getElementById("game").style.display = "none";

// Score Related Variables.
var wins = 0; // Number of wins.
var losses = 0; // Number of losses.
var Guesses = 13; // Number of guesses.
var guessesMade = 0; //  Number of guesses made.

// DOM storage variables.
var userGuesses = document.getElementById("userGuesses"); // Store how many words are left to guess.
var lettersPicked = document.getElementById("lettersPicked"); // Store how many letters the user guessed.
var totalGuessCounter = document.getElementById("totalGuessCounter"); // Store the number of total letters the user guessed.

// This builds the game when the user clicks play.
function startGame() {
    document.getElementById("selectMenu").style.display = "none"; // Hide Select Menu.
    document.getElementById("game").style.display = "block"; // Show Game.

    // Starts the games key tracking and functional services.
    Gameinit();
}
// Checks when the user clicks 'Play Now!'.
document.getElementById("startGame").addEventListener("click", startGame);

// Initializes core game functionality when called for.
function Gameinit() {
    document.onkeyup = function (event) {
        // Store the keys.
        var userKeyPressEvent = event.key;
        // Only listen for letters 'A' through 'Z'.
        if (userKeyPressEvent === 'a' | userKeyPressEvent === 'b' | userKeyPressEvent === 'c' | userKeyPressEvent === 'd'
            | userKeyPressEvent === 'e' | userKeyPressEvent === 'f' | userKeyPressEvent === 'g' | userKeyPressEvent === 'h'
            | userKeyPressEvent === 'i' | userKeyPressEvent === 'j' | userKeyPressEvent === 'k' | userKeyPressEvent === 'l'
            | userKeyPressEvent === 'm' | userKeyPressEvent === 'n' | userKeyPressEvent === 'o' | userKeyPressEvent === 'p'
            | userKeyPressEvent === 'q' | userKeyPressEvent === 'r' | userKeyPressEvent === 's' | userKeyPressEvent === 't'
            | userKeyPressEvent === 'u' | userKeyPressEvent === 'v' | userKeyPressEvent === 'w' | userKeyPressEvent === 'x'
            | userKeyPressEvent === 'y' | userKeyPressEvent === 'z') {

            // Show how many guesses the user has left.
            Guesses--;
            // Show how many guesses the user made.
            guessesMade++;
            // Populate remaining user guesses.
            userGuesses.textContent = Guesses;
            // Populate letters the user guessed.
            totalGuessCounter.textContent = guessesMade;
            // Populate all letters typed.
            lettersPicked.textContent += userKeyPressEvent + " ";

            // If the user runs out of guesses, end the game. (For Now)
            if (Guesses < 1) {
                window.location.reload();
            }
        }

        // Array containing all of our hang states.
        var hang_state = new Array();

        // First state.
        hang_state[0] = new Image();
        hang_state[0].src = './assets/images/hang-states/try-2.jpg';

        // Second state.
        hang_state[1] = new Image();
        hang_state[1].src = './assets/images/hang-states/try-3.jpg';

        // Attach a listener to our hang state.
        var baseImg = document.getElementById("baseImg");
        // Loop through our hang states each key click.
        for (var i = 0; i < hang_state.length; i++) {
            baseImg.appendChild(hang_state[i]);
            document.getElementById("baseImg").src = (hang_state[i].src);
        }
    }
}