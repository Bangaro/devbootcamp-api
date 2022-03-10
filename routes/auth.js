const express = require("express");
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
} = require("../controllers/auth-controller");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword/:resettoken", resetPassword);

router.put("/updatedetails", protect, updateDetails);

router.put("/updatepassword", protect, updatePassword);

module.exports = router;