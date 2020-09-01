const HOST = "http://localhost:5000";

export const highScorePrompt = async (gamesWon) => {
  const name = prompt(
    `Sorry, you lost. You've won ${gamesWon} games in a row. Do you want to save your score? If you want to, put your name in a field below`
  );

  if (name) {
    try {
      const response = await fetch(`${HOST}/newScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ name, score: gamesWon }),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getScores = async () => {
  try {
    const response = await fetch(`${HOST}/scores`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
