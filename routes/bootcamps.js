const express = require("express");
const router = express.Router();

const {
    getBootcamps,
    getBootcamp,
    postBootcamps,
    putBootcamps,
    deleteBootcamps,
} = require("../controllers/bootcamps-controller");

router.get("/", getBootcamps);

router.get("/:id", getBootcamp);

router.post("/", postBootcamps);

router.put("/:id", putBootcamps);

router.delete("/:id", deleteBootcamps);

module.exports = router;