function computerPlay() {
  let randNum = Math.floor(Math.random() * 3);
  switch (randNum) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
      break;
  }
}

function playRound(e) {
  let computerSelection = computerPlay();
  let playerSelection = e.target.className;

  // 0 is a win, 1 is a loss, 2 is a tie
  let result = 0;
  // If strings are equal, draw
  if (playerSelection == computerSelection) result = 2;
  // Just check for losing conditions. Win is already set to true.
  else if (playerSelection == "paper" && computerSelection == "scissors")
    result = 1;
  else if (playerSelection == "rock" && computerSelection == "paper")
    result = 1;
  else if (playerSelection == "scissors" && computerSelection == "rock")
    result = 1;

  if (result == 0) {
    incrementValue(playerScore);
    roundWinnerText.textContent = `${playerSelection} beats ${computerSelection}, player wins round!`;
  } else if (result == 1) {
    incrementValue(computerScore);
    roundWinnerText.textContent = `${computerSelection} beats ${playerSelection}, computer wins round :(`;
  } else {
    roundWinnerText.textContent = `${computerSelection} ties ${playerSelection}, no winner this round!`;
  }
}

function incrementValue(text) {
  var value = parseInt(text.textContent, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  text.textContent = value;
  if (checkForWinner()) {
    // Reset scores
    toggleReplayBtn(1);
    btn.forEach((button) => {
      button.disabled = true;
      if (button.textContent == "Play Again") toggleReplayBtn(1);
    });
  }
}

function checkForWinner() {
  if (playerScore.textContent == "5") return true;
  else if (computerScore.textContent == "5") return true;
  else return false;
}

function reset() {
  playerScore.textContent = "0";
  computerScore.textContent = "0";
  btn.forEach((button) => {
    button.disabled = false;
    if (button.textContent == "Play Again") toggleReplayBtn(0);
  });
  roundWinnerText.textContent = "";
}

function toggleReplayBtn(state) {
  console.log(typeof state);
  if (state == 0) {
    // off
    replayBtn.disabled = true;
    replayBtn.setAttribute(
      "style",
      "background: none; font-size: 0px; border: none"
    );
  }
  if (state == 1) {
    // on
    replayBtn.disabled = false;
    replayBtn.setAttribute(
      "style",
      "background: lightblue; font-size: 6px; border: 2px solid black; font-size: 25px;"
    );
  }
}

const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const replayBtn = document.querySelector(".play-again");
const roundWinnerText = document.querySelector(".round-winner");

toggleReplayBtn(0);

const btn = document.querySelectorAll("button");
btn.forEach((button) => {
  button.addEventListener("click", playRound);
  if (button.textContent == "Play Again")
    button.addEventListener("click", reset);
});
