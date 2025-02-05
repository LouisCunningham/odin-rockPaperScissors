// Array containing the possible choices for the game
const choices = ["rock", "paper", "scissors"];

// Variables to track player and computer scores
let playerScore = 0;
let computerScore = 0;

// Variable to track the number of rounds played
let rounds = 0;

// Selecting HTML elements to display game results
const playerChoiceText = document.getElementById("player-choice");
const computerChoiceText = document.getElementById("computer-choice");
const roundResultText = document.getElementById("round-result");
const playerScoreText = document.getElementById("player-score");
const computerScoreText = document.getElementById("computer-score");
const restartButton = document.getElementById("restart");

// Adding event listeners to the three choice buttons (Rock, Paper, Scissors)
document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", function() {
        if (rounds < 5) {  // Only allow play if the game hasn't reached 5 rounds
            playRound(this.id);  // Call playRound function with the clicked button's id
        }
    });
});

// Add event listener to the restart button to reset the game when clicked
restartButton.addEventListener("click", resetGame);

// Function to randomly select the computer's choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to handle one round of the game
function playRound(playerSelection) {
    let computerSelection = getComputerChoice();  // Get the computer's choice
    rounds++;  // Increase the round counter

    // Update the UI to show the choices made by the player and computer
    playerChoiceText.textContent = `You chose: ${playerSelection}`;
    computerChoiceText.textContent = `Computer chose: ${computerSelection}`;

    // Determine the round result
    let result = determineWinner(playerSelection, computerSelection);
    roundResultText.textContent = result; // Display the round result

    // Update the score based on the round result
    if (result.includes("win")) playerScore++;
    if (result.includes("lose")) computerScore++;

    // Update the scoreboard in the UI
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;

    // If 5 rounds are completed, call the function to end the game
    if (rounds === 5) {
        endGame();
    }
}

// Function to determine the winner of a single round
function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!"; // If both choices are the same, it's a tie
    }
    // Winning conditions for the player
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        return "You win this round!"; // Player wins
    }
    return "You lose this round!"; // Otherwise, the player loses
}

// Function to end the game and display the final result
function endGame() {
    if (playerScore > computerScore) {
        roundResultText.textContent = "Game Over! 🎉 You won the game!";
    } else if (computerScore > playerScore) {
        roundResultText.textContent = "Game Over! 😢 The computer won!";
    } else {
        roundResultText.textContent = "Game Over! It's a tie!";
    }
    // Show the restart button so the user can play again
    restartButton.style.display = "block";
}

// Function to reset the game and start over
function resetGame() {
    // Reset scores and round count
    playerScore = 0;
    computerScore = 0;
    rounds = 0;
    
    // Reset the UI text to the initial state
    playerChoiceText.textContent = "You chose: ";
    computerChoiceText.textContent = "Computer chose: ";
    roundResultText.textContent = "";
    playerScoreText.textContent = "0";
    computerScoreText.textContent = "0";
    
    // Hide the restart button again
    restartButton.style.display = "none";
}
