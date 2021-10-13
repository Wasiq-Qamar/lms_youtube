const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  className: {
    type: String,
  },
  classCode: {
    type: String,
  },
  subject: {
    type: String,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

mongoose.model("Class", classSchema);
