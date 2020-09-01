const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use("/", require("./routes/highscore"));

const PORT = 5000;

async function start() {
  try {
    //i know it's bad practice to insert connection string like this :(
    await mongoose.connect(
      'mongodb+srv://misha:q286XEMHXgHKuYpa@cluster0.r7qll.mongodb.net/rockpaperscissors?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
