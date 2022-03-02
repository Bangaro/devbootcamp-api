const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

//@desc   Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
const getBootcamps = asyncHandler(async(req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.json({
        success: true,
        message: "Get all bootcamps",
        count: bootcamps.length,
        data: bootcamps,
    });
});
//@desc   Get single bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access Public
const getBootcamp = asyncHandler(async(req, res, next) => {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
        return next(new ErrorResponse("No resource found", 404));
    }

    res.json({
        success: true,
        message: "Get bootcamp",
        data: bootcamp,
    });
});

//@desc   Create new bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
const postBootcamps = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        message: "Create new bootcamp",
        data: bootcamp,
    });
});

//@desc   Update bootcamp
//@route  POST /api/v1/bootcamps/:id
//@access Private
const putBootcamps = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const bootcamp = await Bootcamp.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) {
        return next(new ErrorResponse("No resource found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Update bootcamp",
    });
});

//@desc   Delete bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
const deleteBootcamps = asyncHandler(async(req, res, next) => {
    const { id } = req.params;

    const bootcamp = await Bootcamp.findOneAndDelete(id);

    if (!bootcamp) {
        return next(new ErrorResponse("No resource found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Delete bootcamp",
    });
});

module.exports = {
    getBootcamps,
    getBootcamp,
    postBootcamps,
    putBootcamps,
    deleteBootcamps,
};