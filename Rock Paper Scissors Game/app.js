const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const msgEl = document.getElementById("msg");
const resetBtn = document.getElementById("reset-btn");

let userScore = 0;
let computerScore = 0;

const options = ["rock", "paper", "scissors"];

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    playRound(userChoice);
  });
});

resetBtn.addEventListener("click", resetGame);

function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  const result = getWinner(userChoice, computerChoice);

  // highlight computer choice
  highlightComputerChoice(computerChoice);

  if (result === "win") {
    userScore++;
    userScoreEl.textContent = userScore;
    showMessage(`You win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}`, "lightgreen");
  } else if (result === "lose") {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    showMessage(`You lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}`, "salmon");
  } else {
    showMessage("It's a draw!", "gold");
  }
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function getWinner(user, computer) {
  if (user === computer) return "draw";

  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function showMessage(text, color) {
  msgEl.textContent = text;
  msgEl.style.color = color;
}

function highlightComputerChoice(choiceId) {
  const compButton = document.getElementById(choiceId);
  compButton.classList.add("highlight");

  setTimeout(() => {
    compButton.classList.remove("highlight");
  }, 600);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  msgEl.textContent = "Play your move";
  msgEl.style.color = "#fff";
}
