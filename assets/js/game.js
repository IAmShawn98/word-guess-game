// Hidden Game Elements.
document.getElementById("game").style.display = "none";

// Score Related Variables.
var wins = 0; // Number of wins.
var losses = 0; // Number of losses.
var Guesses = 13; // Number of guesses.
var guessesMade = 0; //  Number of guesses made.
var isPlayingGame = false;
var selctedWord = "";
var mysteryWord = [];
// Word list for users to guess from.
var wordList = ["rascal", "lapdog", "bootcamp", "tobyisdenzel"];

// DOM storage variables.
var userGuesses = document.getElementById("userGuesses"); // Store how many words are left to guess.
//var userGuesses = [];

var lettersPicked = document.getElementById("lettersPicked"); // Store how many letters the user guessed.
var totalGuessCounter = document.getElementById("totalGuessCounter"); // Store the number of total letters the user guessed.
var generateRandomWord = document.getElementById("generateRandomWord"); // Store random words.


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
    isPlayingGame = true;
    // Reset all game variavles.
    wins = 0;
    losses = 0;
    Guesses = 13;
    guessesMade = 0;
    selectedWord = wordList[Math.floor(wordList.length * Math.random())];
    var hiddenWord = [];

    // Generate the intial display of the random word.
    for (var i = 0; i < selectedWord.length; i++) {
        hiddenWord.push("-");
    }
    // Get a reference to the word element.
    var generateRandomWord = document.getElementById("generateRandomWord");
    
    // Populate the hidden word.
    generateRandomWord.textContent = hiddenWord;

    // Replace the "-" with the guessed letters.
    document.getElementById("generateRandomWord").textContent = hiddenWord.join(" ");

    
}

document.onkeyup = function (event) {
    if (!isPlayingGame) {
        return false;
    }

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


        // Populate letters to the letters guessed box.
        lettersPicked.textContent += userKeyPressEvent + " ";

        // If the user runs out of guesses, end the game. (For Now)
        if (Guesses < 1) {
            window.location.reload();
        }
    }
}