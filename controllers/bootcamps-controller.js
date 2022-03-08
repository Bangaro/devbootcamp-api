const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const geocoder = require("../utils/geocoder");
const path = require("path");

//@desc   Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
const getBootcamps = asyncHandler(async(req, res, next) => {
    res.json(res.advancedResults);
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

    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
        return next(new ErrorResponse("No resource found", 404));
    }

    bootcamp.remove();

    res.status(200).json({
        success: true,
        message: "Delete bootcamp",
    });
});

//@desc   Get bootcamps within a radius
//@route  GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
const getBootcampsInRadius = asyncHandler(async(req, res, next) => {
    const { zipcode, distance } = req.params;

    //Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calc radius using radians
    //Divide dist by radius of earth
    //Earth radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ],
            },
        },
    });

    res.json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    });
});

//@desc   Upload photo for bootcamp
//@route  PUT /api/v1/bootcamps/:id/photo
//@access Private
const uploadPhoto = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
        return next(new ErrorResponse("No resource found", 404));
    }

    if (!req.files) {
        return next(new ErrorResponse("Please upload a file", 400));
    }

    const file = req.files.file;

    //Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse("Please upload an image file", 400));
    }

    //Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload a image less than${process.env.MAX_FILE_UPLOAD}`,
                413
            )
        );
    }

    //Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async(err) => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse("Problem with file upload", 500));
        }

        await Bootcamp.findByIdAndUpdate(id, { photo: file.name });

        res.status(200).json({
            success: true,
            data: file.name,
            message: "Photo uploaded",
        });
    });
});

module.exports = {
    getBootcamps,
    getBootcamp,
    postBootcamps,
    putBootcamps,
    deleteBootcamps,
    getBootcampsInRadius,
    uploadPhoto,
};