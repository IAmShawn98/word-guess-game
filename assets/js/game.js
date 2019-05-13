/*
███████████████████████████████████████████████
██                                           ██
██           - HIDDEN DOM ELEMENTS -         ██
██          Objects within this range        ██
██          are HTML elements that are       ██
██          hidden from the players view     ██ 
██          until the player clicks the      ██
██             'Play Now!' button.           ██
██                                           ██
███████████████████████████████████████████████
*/

// Keeps the game area hidden until called on.
document.getElementById("game").style.display = "none";

// Listen for when the player clicks the 'Play Now!' button.
document.getElementById("startGame").addEventListener("click", playNow);

/*
███████████████████████████████████████████████
██                                           ██
██             - Game Initializers -         ██
██          These are the functions that     ██
██          are responsible for building     ██
██          out how the game should play     ██ 
██          when a player clicks the         ██
██              'Play Now!' button.          ██
██                                           ██
███████████████████████████████████████████████
*/

/* ██ Set Game Variables ██ */

var pGuessesLeft = 25; // Player Guesses Left.
var pGuessTotal = 0; // Player Guesses Made.
var pWinStreak = 0; // Player Win Tally.

// This function starts up the core JavaScript that makes this a game.
function playNow() {
    document.getElementById("selectMenu").style.display = "none"; // Removes the selection menu.
    document.getElementById("game").style.display = "block"; // Shows the game area.

    // Initializes the games core code.
    Gameinit();
}

// Initializes core game functionality.
function Gameinit() {

    /* ██ New Game Variables ██ */
    pGuessesLeft = 25;


    /* ██ Word Array ██ */

    // Create an array of words.
    var words = ["rascal", "lapdog", "bootcamp", "tobyisdenzel"];
    // Randomize each word.
    var word = words[Math.floor(Math.random() * words.length)];
    // 'Encrpyt' the random words with "_" underscores.
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    /* ██ DOM Listeners ██ */

    // DOM - Random Word Listener.
    var randomWord = document.getElementById("randomWord");
    // DOM - Player Guesses Left.
    var pGuessesRemaining = document.getElementById("pGuessesRemaining");
    // DOM - Player Guesses Made.
    var pGuessesTotal = document.getElementById("pGuessesTotal");
    // DOM - Letter Guess Listener.
    var userLetterGuesses = document.getElementById("userLetterGuesses");
    // Measures the length of each random word.
    var remainingLetters = word.length;

    /* ██ Keyboard Events ██ */

    // Log the players keyboard.
    document.onkeyup = function (event) {
        // Store player key presses.
        var userKeyStorage = event.key;
        // Hold the players guesses for underscore population.
        var guess = userKeyStorage;
        // If the user picks a correct letter, replace underscore with letter.
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guess) {
                answerArray[j] = guess;
            }
        }
        // Only listen for letters 'A' through 'Z'.
        if (userKeyStorage === 'a' | userKeyStorage === 'b' | userKeyStorage === 'c' | userKeyStorage === 'd'
            | userKeyStorage === 'e' | userKeyStorage === 'f' | userKeyStorage === 'g' | userKeyStorage === 'h'
            | userKeyStorage === 'i' | userKeyStorage === 'j' | userKeyStorage === 'k' | userKeyStorage === 'l'
            | userKeyStorage === 'm' | userKeyStorage === 'n' | userKeyStorage === 'o' | userKeyStorage === 'p'
            | userKeyStorage === 'q' | userKeyStorage === 'r' | userKeyStorage === 's' | userKeyStorage === 't'
            | userKeyStorage === 'u' | userKeyStorage === 'v' | userKeyStorage === 'w' | userKeyStorage === 'x'
            | userKeyStorage === 'y' | userKeyStorage === 'z') {


            /* ██ HTML Page Populators ██ */

            // Set Guesses Left Deductor.
            pGuessesLeft--;

            // For now, if the user runs out of guesses
            // send them back to the title screen.
            if (pGuessesLeft === 0) {
                window.location.reload();
            }

            // Populate Guesses Left.
            pGuessesRemaining.textContent = pGuessesLeft;

            // Set guess total counter.
            pGuessTotal++;

            // Populate player guess total.
            pGuessesTotal.textContent = pGuessTotal;

            // Populate Random Word.
            randomWord.textContent = answerArray.join(" ");

            // Populate Key Presses.
            userLetterGuesses.textContent += userKeyStorage + " ";
        }
    }
}

