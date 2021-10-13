const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Class = mongoose.model("Class");
const Quiz = mongoose.model("Quiz");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

////////////////        ATTEMPT QUIZ        /////////////////

router.patch("/quiz/attempt", requireAuth, async (req, res) => {
  const { quizId, studentId, score } = req.body;

  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const result = await Quiz.updateOne(
      { _id: quizId },
      { $push: { attemptedBy: { student: studentId, score: score } } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

module.exports = router;
