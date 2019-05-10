// Keep these elements hidden until called on.
document.getElementById("game").style.display = "none";

// When the user clicks the 'Play Now!' button, setup the game.
function startGame() {
    document.getElementById("selectMenu").style.display = "none"; // Hide Select Menu.
    document.getElementById("game").style.display = "block"; // Show Game.
}

// Listen for 'Play Now!' button click.
document.getElementById("startGame").addEventListener("click", startGame);

// Win/Loss/Guessed Variables.
var win = 0;
var losses = 0;
var uGuesses = 13;

// Listen for guess keys.
var userGuesses = document.getElementById("userGuesses");

// Track the users keyboard events.
document.onkeyup = function (event) {
    // Store the users keys.
    var userKeyPressEvent = event.key;
    // Log Keys for now.
    if (userKeyPressEvent === 'a' | userKeyPressEvent === 'b' | userKeyPressEvent === 'c' | userKeyPressEvent === 'd' | userKeyPressEvent === 'e' | userKeyPressEvent === 'f' | userKeyPressEvent === 'g' | userKeyPressEvent === 'h' | userKeyPressEvent === 'i' | userKeyPressEvent === 'j' | userKeyPressEvent === 'k' | userKeyPressEvent === 'l' | userKeyPressEvent === 'm' | userKeyPressEvent === 'n' | userKeyPressEvent === 'o' | userKeyPressEvent === 'p' | userKeyPressEvent === 'q' | userKeyPressEvent === 'r' | userKeyPressEvent === 's' | userKeyPressEvent === 't' | userKeyPressEvent === 'u' | userKeyPressEvent === 'v' | userKeyPressEvent === 'w' | userKeyPressEvent === 'x' | userKeyPressEvent === 'y' | userKeyPressEvent === 'z') {
        uGuesses--;

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
    // Push user guesses to the counter.
    userGuesses.textContent = uGuesses;

    // If the user runs out of guesses, end the game.
    if (uGuesses < 1) {
        window.location.reload();
    }
}