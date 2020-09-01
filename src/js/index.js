import { Game } from "./game";
import { highScorePrompt, getScores } from "./async";

import "../scss/scss.scss";

const main = function () {
  let gamesWon = 0;
  let game = new Game();

  const newGameStart = () => {
    /*CLOSURE EXAMPLE 
    own enviroment: none
    outer enviroment: global LE, main LE: gamesWon, game.
    here we are using game from outer LE
    */
    game.shutdown();
    game = new Game();
    game.initialize();
  };

  document.getElementById("reset-button").addEventListener("click", () => {
    if (confirm("Do you really want to reset all of your progress?")) {
      gamesWon = 0;
      newGameStart();
    }
  });

  document.getElementById("new-game").addEventListener("click", (event) => {
    event.target.style.display = "none";
    newGameStart();
  });

  document.getElementById("leaderboard").addEventListener("click", () => {
    getScores()
      .then((response) => response.json())
      .then((scores) => {
        alert(`Top 5 scores:\n` + scores);
      });
  });

  document.addEventListener("game-won", () => {
    game.resultLabel.showVictory();
    gamesWon++;
    document.getElementById("new-game").style.display = "block";
  });

  document.addEventListener("game-lost", () => {
    document.getElementById("new-game").style.display = "block";
    game.resultLabel.showLose();
    if (gamesWon) {
      highScorePrompt(gamesWon);
    }
  });

  //first start
  game.initialize();
};

main();
