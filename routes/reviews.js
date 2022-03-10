const express = require("express");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middlewares/auth");

const { getReviews, getReview } = require("../controllers/reviews-controller");

const Review = require("../models/Review");

const advancedResults = require("../middlewares/advancedResults");

router.get(
    "/",
    protect,
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
);

router.get("/:id", getReview);

module.exports = router;