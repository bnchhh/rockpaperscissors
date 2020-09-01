import { PAPER_KEY, SCISSORS_KEY, ROCK_KEY } from "./constants";

class AiStrategyInterface {
  constructor(roundNumber) {
    this.roundNumber = roundNumber;
  }

  getComputerChoice() {
    throw Error("This method should be overwrited");
  }
}

class AiRandom extends AiStrategyInterface {
  getComputerChoice() {
    const randomValue = Math.ceil(Math.random() * 3);

    if (randomValue === 1) {
      return ROCK_KEY;
    }
    if (randomValue === 2) {
      return SCISSORS_KEY;
    }

    if (randomValue === 3) {
      return PAPER_KEY;
    }
  }
}

class AiTurnByTurn extends AiStrategyInterface {
  getComputerChoice() {
    const roundValue = this.roundNumber % 3;
    if (roundValue === 0) {
      return ROCK_KEY;
    }

    if (roundValue === 1) {
      return SCISSORS_KEY;
    }

    if (roundValue === 2) {
      return PAPER_KEY;
    }
  }
}

export { AiTurnByTurn, AiRandom };
