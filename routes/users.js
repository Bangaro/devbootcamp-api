const express = require("express");

const router = express.Router();

const User = require("../models/User");

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
} = require("../controllers/users-controller");

const advancedResults = require("../middlewares/advancedResults");

const { protect, authorize } = require("../middlewares/auth");

router.use(protect);
router.use(authorize("admin"));

router.get("/", advancedResults(User), getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;