const express = require("express");

//Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

const {
    getBootcamps,
    getBootcamp,
    postBootcamps,
    putBootcamps,
    deleteBootcamps,
    getBootcampsInRadius,
} = require("../controllers/bootcamps-controller");

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.get("/", getBootcamps);

router.get("/:id", getBootcamp);

router.post("/", postBootcamps);

router.put("/:id", putBootcamps);

router.delete("/:id", deleteBootcamps);

module.exports = router;