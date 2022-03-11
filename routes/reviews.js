const express = require("express");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middlewares/auth");

const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviews-controller");

const Review = require("../models/Review");

const advancedResults = require("../middlewares/advancedResults");

router.get(
    "/",
    protect,
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
);

router.get("/:id", getReview);

router.post("/", protect, authorize("user", "admin"), addReview);

router.put("/:id", protect, authorize("user", "admin"), updateReview);

router.delete("/:id", protect, authorize("user", "admin"), deleteReview);

module.exports = router;