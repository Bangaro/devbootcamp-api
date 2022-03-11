const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title for the review"],
        maxlength: [50, "Title cannot be more than 50 characters"],
        trim: true,
    },
    text: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: [500, "Description cannot be more than 500 characters"],
    },
    rating: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [10, "Rating must be at most 10"],
        required: [true, "Please add a rating between 1 and 10"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

//Static method to get average rating
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
    const obj = await this.aggregate([{
            $match: { bootcamp: bootcampId },
        },
        {
            $group: {
                _id: "$bootcamp",
                averageRating: { $avg: "$rating" },
            },
        },
    ]);

    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating,
        });
    } catch (error) {
        console.log(error);
    }
};

//Call getAverageRating after save
ReviewSchema.post("save", function() {
    this.constructor.getAverageRating(this.bootcamp);
});

//Call getAverageRating before remove
ReviewSchema.pre("remove", function() {
    this.constructor.getAverageRating(this.bootcamp);
});

//Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);