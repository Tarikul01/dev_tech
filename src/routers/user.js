const express = require("express");
const router = express.Router();
const {
  signin,
  signup
} = require("../controllers/user");

//route create.

// Authenticate

router.post("/signup", signup);
router.post("/signin", signin);



module.exports = router;
