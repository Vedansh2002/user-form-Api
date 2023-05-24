const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUsers");
router.post("/user-form", createUser);
router.get("/getallUsers", getUser);

module.exports = router;
