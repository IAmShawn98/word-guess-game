// DOM Elements we want to call later.
var selectMenu = document.getElementById("selectMenu");
var game = document.getElementById("game");
var randomWordDisplay = document.getElementById("randomWordDisplay");
var pGuessesRemaining = document.getElementById("pGuessesRemaining");
var userLetterGuesses = document.getElementById("userLetterGuesses");
var playerWon = document.getElementById("playerWon");
var playerLost = document.getElementById("playerLost");


// Global Game Variables.
var playerRemainingGuesses = 35;
var playerGamesLost = 1;
var playerGamesWon = 1;
var answerArray = [];
var guessArray = [];
var matchWord = [];

// Wait for the user to click on 'Play Now!' to start 'loadNewHangman()'.

// When the user clicks on 'Play Now!', show the game area and run the 'gameInit()' function.
document.getElementById("startGame").addEventListener("click", loadNewHangman);

// Shows the game area and starts 'gameInit()'.
function loadNewHangman() {
    // Remove the menu select screen.
    selectMenu.style.display = "none";
    // Shows the game area.
    game.style.display = "block";
    // Starts up a new game.
    gameInit();
}

// When the user runs out of guesses, start a new game and reset all player stats.
if (playerRemainingGuesses < 1) {
    Gameinit();
}

// Create a function that initializes the games default stats & functionality.

// Initialize new game.
function gameInit() {

    // Reset Used Letters.
    userLetterGuesses.textContent = "";

    // Create an array to hold the words the player must guess.
    var wordList = ["completely", "swim", "thy", "available", "mad", "herself", "label", "college", "stream", "twice", "drop", "grade", "leaf", "riding", "bow", "frighten", "article", "screen", "bare", "wheel", "teach", "general", "fairly", "evidence", "century", "thee", "happened", "phrase", "also", "image", "pan", "something", "compare", "clothes", "loss", "require", "diagram", "pine", "team", "torn", "flow", "gain", "radio", "themselves", "consonant", "stop", "rope", "scared", "plant", "burst", "treated", "exclaimed", "state", "real", "being", "circle", "center", "first", "frog", "either", "depth", "thus", "screen", "depth", "fell", "read", "lay", "younger", "organization", "southern", "tears", "lie", "sometime", "blank", "wrapped", "dirty", "including", "thy", "yesterday", "principle", "pressure", "pictured", "printed", "forty", "horn", "over", "machine", "hole", "fairly", "game", "fireplace", "pine", "lost", "bootcamp", "tobyisdenzel", "code", "javascript", "pepsi", "rascal"];
    // Randomize each word.
    var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    // Make the cheaters feel bad about themselves.
    var feelBadArray = [
        "I caught you red handed, cheater! Just take it.",
        "Cheating, in my game? I'm not mad, just disappointed. Go on and take it.",
        "Cheating isn't a good look, you know. Pathetic. Just take the word and go.",
        "Do you really think this is just another generic hangman game with all the answers logged in the console? Oh wait. JUST TAKE IT!",
    ];
    // Randomize the feel bad phrases.
    var randomPhrase = feelBadArray[Math.floor(Math.random() * feelBadArray.length)];
    // Creates a little character in the console that makes the player feel bad for cheating!
    console.log("%cCHEATER ALERT!", "color: red; font-weight: bold; text-shadow: 2px 2px 10px; font-size: 200%;");
    console.log(' ಠ_ಠ' + "  " + randomPhrase + "\n" +
        ' /█──' + " " + "The word is: '" + randomWord + "'." + '\n' +
        ' .Π.' + '\n' +
        '');
    // Stores a single random word so we can populate the DOM.
    var singleGuess = [];
    // Hide the words with underscores.
    for (var i = 0; i < randomWord.length; i++) {
        singleGuess.push("_");
    }
    // Populate the hidden random word to the DOM.
    randomWordDisplay.textContent = singleGuess.join(" ");

    // Log the players keyboard events.
    document.onkeyup = function (event) {
        // Store the players latest keypress.
        var playerKeyPress = event.key;
        // Only track input from characters (A through Z).
        if (playerKeyPress === 'a' | playerKeyPress === 'b' | playerKeyPress === 'c' | playerKeyPress === 'd'
            | playerKeyPress === 'e' | playerKeyPress === 'f' | playerKeyPress === 'g' | playerKeyPress === 'h'
            | playerKeyPress === 'i' | playerKeyPress === 'j' | playerKeyPress === 'k' | playerKeyPress === 'l'
            | playerKeyPress === 'm' | playerKeyPress === 'n' | playerKeyPress === 'o' | playerKeyPress === 'p'
            | playerKeyPress === 'q' | playerKeyPress === 'r' | playerKeyPress === 's' | playerKeyPress === 't'
            | playerKeyPress === 'u' | playerKeyPress === 'v' | playerKeyPress === 'w' | playerKeyPress === 'x'
            | playerKeyPress === 'y' | playerKeyPress === 'z') {

            // Default Keypress Sound.
            var audio = new Audio('assets/audio/keypress.mp3');
            audio.volume = 0.04; // MP3 Volume.
            audio.play();

            // If the player picks a correct letter, replace the underscore with the correct letter.
            var guess = playerKeyPress;
            for (var j = 0; j < randomWord.length; j++) {
                if (randomWord[j] === guess) {
                    singleGuess[j] = guess;
                    matchWord[j] = guess;
                    // Update the DOM to show the players progress.
                    randomWordDisplay.textContent = singleGuess.join(" ");
                    // Place the correct letter into the guess box.
                    userLetterGuesses.textContent += playerKeyPress + " ";
                    // Remaining guess deductor.
                    playerRemainingGuesses--;
                }
                if (randomWord.length === matchWord.length) {
                    alert("You Won!");
                    playerWon.textContent = playerGamesWon++;
                    playerRemainingGuesses = 35;
                    guessArray = [];
                    matchWord = [];
                    gameInit();
                    break;
                } else if (playerRemainingGuesses === 0) {
                    alert("You Lost!");
                    playerLost.textContent = playerGamesLost++;
                    playerRemainingGuesses = 35;
                    guessArray = [];
                    matchWord = [];
                    gameInit();
                    break;
                }
            }

            // Deduct remaining guesses from the user with each letter pressed.
            pGuessesRemaining.textContent = playerRemainingGuesses;
            // Deduct by one each press.
            playerRemainingGuesses--;
        }
    }
}