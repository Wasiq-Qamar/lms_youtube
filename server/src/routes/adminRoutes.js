const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const Class = mongoose.model("Class");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

////////////////        ADD TEACHER / STUDENT / HEAD        /////////////////

router.post("/user/create", requireAuth, async (req, res) => {
  const { name, email, profileImage, phoneNumber, userType } = req.body;
  if (req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(regEx)) {
    return res.status(422).json({ error: "Must provide valid email" });
  }

  try {
    const user = new User({
      name,
      email,
      phoneNumber,
      profileImage,
      userType,
    });
    await user.save();

    res.send({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        GET USERS / DASHOBOARD       /////////////////

router.get("/users", requireAuth, async (req, res) => {
  try {
    let filters = {};
    let usersListing = await User.find(filters);
    let totalRecords = await User.countDocuments(filters);
    if (totalRecords <= 0) {
      return res.status(422).send({ error: "No users found" });
    }
    res.send({ users: usersListing, totalRecords: totalRecords });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

////////////////        GET USER       /////////////////

router.get("/user/:id", requireAuth, async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(422).send({ error: "User Not found" });
    }
    res.send({ user });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

////////////////        EDIT USER / DASHOBOARD       /////////////////

router.patch("/user/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    res.send(result);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

////////////////        UPLOAD USER IMAGE       /////////////////

router.patch("/user/uploadImage/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    res.send(result);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

////////////////        DELETE USER / DASHOBOARD       /////////////////

router.delete("/user/:id", requireAuth, async (req, res) => {
  const id = req.params.id;

  if (req.user.userType !== "admin") {
    return res.status(422).send({ error: "Only admin can use this facility" });
  }

  try {
    await User.deleteOne({ _id: id });
    res.send({ message: "User deleted Succesfully" });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

////////////////        ADD CLASS        /////////////////

router.post("/class/create", requireAuth, async (req, res) => {
  const { className, classCode, teacherId, subject } = req.body;
  const students = [];

  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const newClass = new Class({
      className,
      classCode,
      teacherId,
      subject,
      students,
    });
    await newClass.save();

    res.send({
      class: newClass,
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        GET CLASSES        /////////////////

router.get("/classes", requireAuth, async (req, res) => {
  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const classes = await Class.find();
    const totalClasses = await Class.countDocuments();
    if (totalClasses <= 0) {
      return res.status(422).send({ error: "No Class found" });
    }
    res.send({ classes, totalClasses });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        ADD STUDENT TO CLASS        /////////////////

router.patch("/student/add", requireAuth, async (req, res) => {
  const { studentId, classId } = req.body;

  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const result = await Class.updateOne(
      { _id: classId },
      { $push: { students: studentId } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        ASSIGN TEACHER TO CLASS        /////////////////

router.patch("/teacher/assign", requireAuth, async (req, res) => {
  const { teacherId, classId } = req.body;

  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const result = await Class.findByIdAndUpdate(
      { _id: classId },
      { teacherId },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        GET CLASS DETAILS        /////////////////

router.get("/class/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  if (req.user.userType !== "teacher" && req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    const result = await Class.findOne({ _id: id }).populate("students");
    res.send({ class: result });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

////////////////        EDIT CLASS       /////////////////

router.patch("/class/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const result = await Class.findByIdAndUpdate(id, updates, { new: true });
    res.send(result);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

////////////////        DELETE CLASS       /////////////////

router.delete("/class/:id", requireAuth, async (req, res) => {
  const id = req.params.id;

  if (req.user.userType !== "admin") {
    return res.status(422).send({ error: "Access Denied" });
  }

  try {
    await Class.deleteOne({ _id: id });
    res.send({ message: "Class deleted Succesfully" });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
