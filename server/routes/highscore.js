const { Router } = require("express");
const Highscore = require("../models/Highscore");

const router = new Router();

router.get("/scores", async (req, res) => {
  try {
    const scoresCollection = await Highscore.find({})
      .sort({ score: -1 })
      .limit(5)
      .select({ name: 1, score: 1 })

    const leaderboardString = scoresCollection.map(({name,score }) => {
      return `${name}: ${score}`
    }).join('\n');

    res.status(201).json(leaderboardString);
  } catch (error) {
    res.status(500).json({ message: "Scores getting fault " + error });
  }
});

router.post("/newScore", async (req, res) => {
  try {
    const { name = "unknown", score } = req.body;
    const route = await Highscore.create({
      name: name,
      score: score,
    });

    res.status(201).json({ message: "Highscore saved" });
  } catch (e) {
    return res.status(500).json({ message: "Highscore adding error " + e });
  }
});

module.exports = router;
