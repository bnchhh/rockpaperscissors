function findWinner(playerChoice, computerChoice) {
  //draw variant
  if (playerChoice === computerChoice) {
    return "draw";
  }
  //win variant for player
  if (playerChoice === "paper" && computerChoice === "rock") {
    return "win";
  }

  if (playerChoice === "rock" && computerChoice === "scissors") {
    return "win";
  }

  if (playerChoice === "scissors" && computerChoice === "paper") {
    return "win";
  }

  //only lose results left
  return "loss";
}
