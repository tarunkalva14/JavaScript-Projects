let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const turnIndicator = document.getElementById("turn-indicator");

let turnO = true; // true = O's turn, false = X's turn

// Update whose turn it is
function updateTurnIndicator() {
  turnIndicator.textContent = turnO ? "Player O's turn" : "Player X's turn";
}

// All possible winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game state
const resetGame = () => {
  turnO = true; // O always starts (change to false if X should start)
  enableBoxes();
  msgContainer.classList.add("hide");
  updateTurnIndicator();
};

// Handle box click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;

    checkWinner();

    // Switch turn after placing
    turnO = !turnO;
    updateTurnIndicator();
  });
});

// Disable all boxes (after win)
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes (reset)
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }
};

// Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initialize
resetGame();
