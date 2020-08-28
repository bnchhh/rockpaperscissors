class AiStrategyInterface {
  getComputerChoice() {}
}

class AiRandom extends AiStrategyInterface {
  getComputerChoice() {
    //we are getting random int value from 1 to 3
    const randomValue = Math.ceil(Math.random() * 3);

    if (randomValue === 1) {
      return "rock";
    }

    if (randomValue === 2) {
      return "scissors";
    }

    if (randomValue === 3) {
      return "paper";
    }
  }
}

class AiSimulacrum extends AiStrategyInterface {
  getComputerChoice() {
    //previous choice
  }
}

class AiTurnByTurn extends AiStrategyInterface {
  getComputerChoice() {
    //numberOfRound%3
  }
}

export { AiRandom };
