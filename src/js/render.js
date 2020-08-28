function renderRound() {
  const roundDiv = document.createElement("div");

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const rockBtn = document.createElement("button");
  const paperBtn = document.createElement("button");
  const scissorsBtn = document.createElement("button");

  rockBtn.value = "rock";
  paperBtn.value = "paper";
  scissorsBtn.value = "scissors";

  rockBtn.innerText = "Rock";
  paperBtn.innerText = "Paper";
  scissorsBtn.innerText = "Scissors";
}
