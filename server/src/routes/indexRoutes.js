const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    return res.json({
        message: 'LMS Server is Running.'
    });
})

router.get("/error", async(req, res) => {
    return res.json({
        message: 'Something went wrong on server side.'
    });
})

module.exports = router;