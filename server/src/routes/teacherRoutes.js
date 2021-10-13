const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Class = mongoose.model("Class");
const Quiz = mongoose.model("Quiz");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

////////////////        ADD QUIZ        /////////////////

router.post("/quiz/add", requireAuth, async (req, res) => {
  const { title, questions } = req.body;
  const attemptedBy = [];

  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const quiz = new Quiz({
      title,
      questions,
      attemptedBy,
    });
    await quiz.save();

    res.send({
      quiz,
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        GET QUIZ DETAILS        /////////////////

router.get("/quiz/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const result = await Quiz.findOne({ _id: id }).populate(
      "attemptedBy",
      "name"
    );
    res.send({ quiz: result });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        DELETE QUIZ       /////////////////

router.delete("/quiz/:id", requireAuth, async (req, res) => {
  const id = req.params.id;

  if (req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    await Quiz.deleteOne({ _id: id });
    res.send({ message: "Quiz deleted Succesfully" });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
