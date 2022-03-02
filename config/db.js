const moongose = require("mongoose");

const connectDB = async() => {
    try {
        await moongose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected...".cyan.underline.bold);
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;