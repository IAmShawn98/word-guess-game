/* ██ DOM Listeners ██ */

// DOM - Random Word Listener.
var randomWord = document.getElementById("randomWord");
// DOM - Player Guesses Left.
var pGuessesRemaining = document.getElementById("pGuessesRemaining");
// DOM - Player Guesses Made.
var pGuessesTotal = document.getElementById("pGuessesTotal");
// DOM - Letter Guess Listener.
var userLetterGuesses = document.getElementById("userLetterGuesses");
// DOM - Game Area.
var gameArea = document.getElementById("game");

// Keeps the game hidden until the player starts it.
gameArea.style.display = "none";

// Listen for when the player clicks the 'Play Now!' button.
document.getElementById("startGame").addEventListener("click", playNow);

/* ██ Set Game Variables ██ */

var pGuessesLeft = 25; // Player Guesses Left.
var pGuessTotal = 0; // Player Guesses Made.
var pWinStreak = 0; // Player Win Tally.
var remainingLetters = word.length; // Stores word length.

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
    pGuessTotal = 0;
    pWinStreak = 0;

    // Clear Letters Used.`
    userLetterGuesses.textContent = "";

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

    // Populate the random word to the page.
    randomWord.textContent = answerArray.join(" ");

    /* ██ Keyboard Events ██ */

    // Log the players keyboard.
    document.onkeyup = function (event) {
        // Store player key presses.
        var playerKeyPress = event.key;
        // Hold the players key presses.
        var guess = playerKeyPress;
        // If the player picks a correct letter, replace underscore with letter.
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guess) {
                answerArray[j] = guess;
            }
        }

        // Only listen for letters 'A' through 'Z'.
        if (playerKeyPress === 'a' | playerKeyPress === 'b' | playerKeyPress === 'c' | playerKeyPress === 'd'
            | playerKeyPress === 'e' | playerKeyPress === 'f' | playerKeyPress === 'g' | playerKeyPress === 'h'
            | playerKeyPress === 'i' | playerKeyPress === 'j' | playerKeyPress === 'k' | playerKeyPress === 'l'
            | playerKeyPress === 'm' | playerKeyPress === 'n' | playerKeyPress === 'o' | playerKeyPress === 'p'
            | playerKeyPress === 'q' | playerKeyPress === 'r' | playerKeyPress === 's' | playerKeyPress === 't'
            | playerKeyPress === 'u' | playerKeyPress === 'v' | playerKeyPress === 'w' | playerKeyPress === 'x'
            | playerKeyPress === 'y' | playerKeyPress === 'z') {

            /* ██ Keyup Audio ██ */

            // Default Keypress Sound.
            var audio = new Audio('assets/audio/keypress.mp3');
            audio.volume = 0.04; // Mp3 Volume.
            audio.play();

            /* ██ HTML Page Populators ██ */

            // Set Guesses Left Deductor.
            pGuessesLeft--;

            // Set guess total counter.
            pGuessTotal++;

            // Populate player guess total.
            pGuessesTotal.textContent = pGuessTotal;

            // Populate Guesses Left.
            pGuessesRemaining.textContent = pGuessesLeft;

            // Buffer underscores to show the players progress.
            randomWord.textContent = answerArray.join(" ");

            // Populate Key Presses.
            userLetterGuesses.textContent += playerKeyPress + " ";
        }
        // When the user runs out of guesses, start a new game and reset all player stats.
        if (pGuessesLeft < 1) {
            Gameinit();
        }
    }
}