const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String },
  option1: { type: String },
  option2: { type: String },
  option3: { type: String },
  option4: { type: String },
  answer: { type: String },
});

const quizSchema = new mongoose.Schema({
  title: { type: String },
  questions: [questionSchema],
  attemptedBy: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      score: { type: Number },
    },
  ],
});

mongoose.model("Quiz", quizSchema);
