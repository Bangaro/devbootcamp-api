const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    weeks: {
        type: Number,
        required: [true, "Please add a number of weeks"],
    },
    tuition: {
        type: Number,
        required: [true, "Please add a tuition cost"],
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skill"],
        enum: ["beginner", "intermediate", "advanced"],
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
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
});

//Static method to get average cost
CourseSchema.statics.getAverageCost = async function(bootcampId) {
    console.log("Calculating average cost...");

    const obj = await this.aggregate([{
            $match: { bootcamp: bootcampId },
        },
        {
            $group: {
                _id: "$bootcamp",
                averageCost: { $avg: "$tuition" },
            },
        },
    ]);

    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageCost: Match.ceil(obj[0].averageCost / 10) * 10,
        });
    } catch (error) {
        console.log(error);
    }
};

//Call getAverageCost after save
CourseSchema.post("save", function() {
    this.constructor.getAverageCost(this.bootcamp);
});

//Call getAverageCost before remove
CourseSchema.pre("remove", function() {
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);