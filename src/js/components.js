import { ROUND_WIN, ROUND_LOSE, ROUND_DRAW } from "./constants";

export function Counter(gameInfo) {
  this.gameInfo = gameInfo;

  this.roundNumber;
  this.computerScore;
  this.playerScore;

  this.initialize = () => {
    const counterContainer = document.createElement("div");
    counterContainer.className = "counter-container";

    const roundBlock = document.createElement("div");
    roundBlock.className = "counter-block";

    const roundLabel = document.createElement("p");
    roundLabel.className = "counter-label";
    roundLabel.innerText = "Round: ";

    this.roundNumber = document.createElement("span");
    this.roundNumber.innerText = gameInfo.roundNumber;

    roundBlock.append(roundLabel, this.roundNumber);

    const computerBlock = document.createElement("div");
    computerBlock.className = "counter-block";

    const computerLabel = document.createElement("p");
    computerLabel.innerText = "Computer: ";
    computerLabel.className = "counter-label";

    this.computerScore = document.createElement("span");
    this.computerScore.innerText = gameInfo.computer;

    computerBlock.append(computerLabel, this.computerScore);

    const playerBlock = document.createElement("div");
    playerBlock.className = "counter-block";

    const playerLabel = document.createElement("p");
    playerLabel.innerText = "Player: ";
    playerLabel.className = "counter-label";

    this.playerScore = document.createElement("span");
    this.playerScore.innerText = gameInfo.player;

    playerBlock.append(playerLabel, this.playerScore);

    counterContainer.append(roundBlock, playerBlock, computerBlock);
    return counterContainer;
  };

  this.update = () => {
    this.roundNumber.innerText = gameInfo.roundNumber;
    this.computerScore.innerText = gameInfo.computer;
    this.playerScore.innerText = gameInfo.player;
  };
}

export function ResultLabel() {
  this.resultLabel;

  this.initialize = () => {
    this.resultLabel = document.createElement("p");
    this.resultLabel.className = "result-label";

    this.resultLabel.innerText = "Waiting for your choice!";
    return this.resultLabel;
  };

  this.update = (roundResult) => {
    if (roundResult === ROUND_WIN) {
      this.resultLabel.innerText = "You won this round!";
    }

    if (roundResult === ROUND_LOSE) {
      this.resultLabel.innerText = "You lost this round :(";
    }

    if (roundResult === ROUND_DRAW) {
      this.resultLabel.innerText = "This round is draw";
    }
  };

  this.showVictory = () => {
    this.resultLabel.innerText =
      "Hey, you won. Wanna play again? Push 'New game' button below";
  };

  this.showLose = () => {
    this.resultLabel.innerText =
      "Sorry, but you lost this time. Wanna play again? Push 'New game' button below";
  };
}
