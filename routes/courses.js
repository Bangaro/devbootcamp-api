const express = require("express");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middlewares/auth");

const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/courses-controller");

const Course = require("../models/Course");

const advancedResults = require("../middlewares/advancedResults");

router.get(
    "/",
    advancedResults(Course, {
        path: "bootcamp",
        select: "name description",
    }),
    getCourses
);

router.get("/:id", getCourse);

router.post("/", protect, createCourse);

router.put("/:id", protect, updateCourse);

router.delete("/:id", protect, deleteCourse);

module.exports = router;