require("./models/User");
require("./models/Class");
require("./models/Quiz");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const requireAuth = require("./middleware/requireAuth");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authRoutes);
app.use(adminRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

const mongoUri = "INSERT YOUR MONGO URI HERE";
if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
