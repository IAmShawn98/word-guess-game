// DOM Elements we want to call later.
var selectMenu = document.getElementById("selectMenu"); // The menu containing ('How to Play' & 'Play Now!').
var game = document.getElementById("game"); // The 'main' containing the gameplay area.
var randomWordDisplay = document.getElementById("randomWordDisplay"); // The place the random word is populated into.
var pGuessesRemaining = document.getElementById("pGuessesRemaining"); // The remaining number of letters the player has to guess a word.
var userLetterGuesses = document.getElementById("userLetterGuesses"); // The area letter guesses are populated into.
var playerWon = document.getElementById("playerWon"); // The area containing the number of times the player won a game.
var playerLost = document.getElementById("playerLost"); // The area containing the number of times the player lost a game.

// Global Game Variables.
var playerRemainingGuesses = 8; // Player guesses remaining.
var playerGamesLost = 1; // Games Lost.
var playerGamesWon = 1; // Games Won.


// Audio Files.
var defaultPress = new Audio('assets/audio/keypress.mp3'); // Default Key Press.

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

// Create a function that initializes the games default stats & functionality.

// Initialize a new game.
function gameInit() {

    // Reset Used Letters.
    userLetterGuesses.textContent = "";

    // Create an array to hold the words the player must guess.
    var wordList = ["tree", "grass", "soil", "weeds", "rain", "ocean", "life", "flowers", "forrest"];
    // Randomize each word.
    var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    // Stores a single random word so we can populate the DOM.
    var singleGuess = [];
    // Hide the words with underscores.
    for (var i = 0; i < randomWord.length; i++) {
        singleGuess.push("_");
    }
    // Populate the hidden random word to the DOM.
    randomWordDisplay.textContent = singleGuess.join(" ");

    // Make the cheaters feel bad about themselves.
    var feelBadArray = [
        "I caught you red handed, cheater! Just take it.",
        "Cheating, in my game? I'm not mad, just disappointed. Go on and take it.",
        "Cheating isn't a good look, you know. Pathetic. Just take the word and go.",
        "Do you really think this is just another generic hangman game with all the answers logged in the console? Oh wait. JUST TAKE IT!",
    ];
    // Randomize the feel bad phrases.
    var randomPhrase = feelBadArray[Math.floor(Math.random() * feelBadArray.length)];

    // Create a little character in the console that makes the player feel bad for cheating!
    console.log("%cCHEATER ALERT!", "color: red; font-weight: bold; text-shadow: 2px 2px 10px; font-size: 200%;");
    console.log(' ಠ_ಠ' + "  " + randomPhrase + "\n" +
        ' /█──' + " " + "The word is: '" + randomWord + "'." + '\n' +
        ' .Π.' + '\n' +
        '');

    // Log the players keyboard events.
    document.onkeyup = function (event) {
        var playerKeyPress = event.key;
        // Track only the players keypresses (A through Z; A = 65 || Z = 90).
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // Change hangmans hang state based on 'playerKeyPress'.
            document.getElementById("baseImg").src = "./assets/images/hang-states/try-guess-" + playerRemainingGuesses + ".jpg";

            // Default Keypress Sound.
            defaultPress.volume = 0.04; // MP3 Volume.
            defaultPress.play();

            // If the player picks a correct letter, replace the underscore with the correct letter.
            var guess = playerKeyPress;
            for (var j = 0; j < randomWord.length; j++) {
                if (randomWord[j] === guess) {
                    // Override the underscore with the correct letter.
                    singleGuess[j] = guess;
                    // Update the DOM to show the players progress.
                    randomWordDisplay.textContent = singleGuess.join(" ");
                }
                // Win Condition.
                if (randomWord === singleGuess.join("")) {
                    // Let the player know they won.
                    alert("You are correct, the word is '" + randomWord + "'!");
                    // Increment a win point.
                    playerWon.textContent = playerGamesWon++;

                    // Reset game.
                    playerRemainingGuesses = 8;
                    // Reset Hangman.
                    document.getElementById("baseImg").src = "./assets/images/hang-states/try-default.jpg";
                    // Re-Initialize Game.
                    gameInit();
                    // Break Statement Execution.
                    break;
                }
                // Loss Condition.
                if (playerRemainingGuesses === 0) {
                    // Let the player know they lost the game.
                    alert("Better luck next time, the word is '" + randomWord + "'!");
                    // Disable Game.
                    randomWordDisplay.style.display = "none";
                    // Add a loss to the counter.
                    playerLost.textContent = playerGamesLost++;
                    // Show Dead Hangman.
                    document.getElementById("baseImg").src = "./assets/images/hang-states/try-loss.jpg";

                    // Reset game.
                    setTimeout(function () {
                        // Re-Enable Game.
                        randomWordDisplay.style.display = "block";
                        // Reset Hangman.
                        document.getElementById("baseImg").src = "./assets/images/hang-states/try-default.jpg";
                    }, 3000);

                    // Reset Guesses
                    playerRemainingGuesses = 8;

                    // Re-Initialize Game.
                    gameInit()
                    // Break Statement Execution.
                    break;
                }
            }

            // Populate remaining guesses.
            pGuessesRemaining.textContent = playerRemainingGuesses;
            // Remaining guess deductor.
            playerRemainingGuesses--;

            // Each time a letter is typed, put it into the guess box.
            userLetterGuesses.textContent += playerKeyPress + " ";
        }
    }
}