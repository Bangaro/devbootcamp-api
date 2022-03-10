const express = require("express");

//Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    getBootcamps,
    getBootcamp,
    postBootcamps,
    putBootcamps,
    deleteBootcamps,
    getBootcampsInRadius,
    uploadPhoto,
} = require("../controllers/bootcamps-controller");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middlewares/advancedResults");

const reviewRouter = require("./reviews");

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.get("/radius/:zipcode/:distance", getBootcampsInRadius);

router.get("/", advancedResults(Bootcamp, "courses"), getBootcamps);

router.get("/:id", getBootcamp);

router.post("/", protect, authorize("publisher", "admin"), postBootcamps);

router.put("/:id", protect, authorize("publisher", "admin"), putBootcamps);

router.delete(
    "/:id",
    protect,
    authorize("publisher", "admin"),
    deleteBootcamps
);

router.put("/:id/photo", protect, authorize("publisher", "admin"), uploadPhoto);

module.exports = router;