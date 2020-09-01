import { AiTurnByTurn, AiRandom } from "./ai";
import {
  ROCK_KEY,
  SCISSORS_KEY,
  PAPER_KEY,
  ROUND_WIN,
  ROUND_LOSE,
  ROUND_DRAW,
  GAME_WON,
  GAME_LOST,
} from "./constants";

import { Counter, ResultLabel } from "./components";

const gameRoot = document.getElementById("game");

function Round(roundNumber) {
  this.roundNumber = roundNumber;
  let strategy;
  let buttonContainer;

  let pickStrategy = () => {
    if (this.roundNumber % 2) {
      return new AiTurnByTurn(this.roundNumber);
    }

    return new AiRandom(this.roundNumber);
  };

  function findWinner(playerChoice, computerChoice) {
    //draw variant
    if (playerChoice === computerChoice) {
      return ROUND_DRAW;
    }
    //win variant for player
    if (playerChoice === PAPER_KEY && computerChoice === ROCK_KEY) {
      return ROUND_WIN;
    }

    if (playerChoice === ROCK_KEY && computerChoice === SCISSORS_KEY) {
      return ROUND_WIN;
    }

    if (playerChoice === SCISSORS_KEY && computerChoice === PAPER_KEY) {
      return ROUND_WIN;
    }
    //only lose results left
    return ROUND_LOSE;
  }

  function disableButtons() {
    const buttonArray = buttonContainer.querySelectorAll("button");

    buttonArray.forEach((button) => {
      button.disabled = true;
    });
  }

  this.getResult = function (playerChoice) {
    disableButtons();
    /*CLOSURE EXAMPLE 
    own enviroment: playerChoice, computerChoice
    outer enviroment: global LE, round LE: roundNumber, strategy, buttonContainer and all methods.
    here we are using strategy from outer LE
    */
    strategy = pickStrategy();

    const computerChoice = strategy.getComputerChoice();
    return findWinner(playerChoice, computerChoice);
  };

  this.render = function () {
    const roundDiv = document.createElement("div");

    buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const rockBtn = document.createElement("button");
    const paperBtn = document.createElement("button");
    const scissorsBtn = document.createElement("button");
    rockBtn.name = "choice";
    paperBtn.name = "choice";
    scissorsBtn.name = "choice";

    rockBtn.value = ROCK_KEY;
    paperBtn.value = PAPER_KEY;
    scissorsBtn.value = SCISSORS_KEY;

    rockBtn.innerText = "Rock";
    paperBtn.innerText = "Paper";
    scissorsBtn.innerText = "Scissors";

    buttonContainer.append(rockBtn, paperBtn, scissorsBtn);

    roundDiv.append(buttonContainer);

    gameRoot.append(roundDiv);
  };
}

export function Game() {
  let gameInfo = {
    roundNumber: 1,
    computer: 0,
    player: 0,
  };

  const counter = new Counter(gameInfo);
  this.resultLabel = new ResultLabel();

  let currentRound;

  const checkGameEnding = () => {
    /*CLOSURE EXAMPLE 
    own enviroment: none
    outer enviroment: global LE, Game LE: gameInfo, counter, resultLabel, currentRound and all methods.
    here we are using gameInfo from outer LE
    */
    if (gameInfo.computer < 3 && gameInfo.player < 3) {
      return null;
    }

    if (gameInfo.computer === 3) {
      return GAME_LOST;
    }

    return GAME_WON;
  };

  const wonGameHandler = () => {
    const wonGameEvent = new Event("game-won");
    document.dispatchEvent(wonGameEvent);
  };

  const loseGameHandler = () => {
    const loseGameEvent = new Event("game-lost");
    document.dispatchEvent(loseGameEvent);
  };

  const updateResults = (roundResult) => {
    if (roundResult === ROUND_WIN) {
      gameInfo.player += 1;
    }

    if (roundResult === ROUND_LOSE) {
      gameInfo.computer += 1;
    }

    this.resultLabel.update(roundResult);
    counter.update();
  };

  const clickHandler = (event) => {
    if (event.target.name === "choice") {
      const currentChoice = event.target.value;
      event.target.classList.add("fired");

      const roundResult = currentRound.getResult(currentChoice);

      gameInfo.roundNumber += 1;
      updateResults(roundResult);

      if (!checkGameEnding()) {
        currentRound = new Round(gameInfo.roundNumber);
        currentRound.render();
        return;
      }
      if (checkGameEnding() === GAME_WON) {
        wonGameHandler();
        return;
      }
      loseGameHandler();
    }
  };

  this.initialize = () => {
    gameRoot.innerHTML = "";
    gameRoot.append(this.resultLabel.initialize());
    gameRoot.append(counter.initialize());

    document.addEventListener("click", clickHandler);
    currentRound = new Round(gameInfo.roundNumber);
    currentRound.render();
  };

  this.shutdown = () => {
    document.removeEventListener("click", clickHandler);
  };
}
