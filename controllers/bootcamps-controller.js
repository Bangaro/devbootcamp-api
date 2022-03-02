const Bootcamp = require("../models/Bootcamp");

//@desc   Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access Public
const getBootcamps = async(req, res) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.json({
            success: true,
            message: "Get all bootcamps",
            count: bootcamps.length,
            data: bootcamps,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error,
        });
    }
};
//@desc   Get single bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access Public
const getBootcamp = async(req, res) => {
    const { id } = req.params;

    try {
        const bootcamp = await Bootcamp.findById(id);

        if (!bootcamp) {
            return res.status(404).json({
                success: false,
                error: "No bootcamp found",
            });
        }

        res.json({
            success: true,
            message: "Get bootcamp",
            data: bootcamp,
        });
    } catch (error) {
        res.json({
            success: false,
            error: error,
        });
    }
};

//@desc   Create new bootcamp
//@route  POST /api/v1/bootcamps
//@access Private
const postBootcamps = async(req, res) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            message: "Create new bootcamp",
            data: bootcamp,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        });
    }
};

//@desc   Update bootcamp
//@route  POST /api/v1/bootcamps/:id
//@access Private
const putBootcamps = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!bootcamp) {
            return res.status(400).json({
                success: false,
                error: "No bootcamp found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Update bootcamp",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error,
        });
    }
};

//@desc   Delete bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
const deleteBootcamps = async(req, res) => {
    const { id } = req.params;

    try {
        const bootcamp = await Bootcamp.findOneAndDelete(id);

        if (!bootcamp) {
            return res.status(400).json({
                success: false,
                error: "No bootcamp found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Delete bootcamp",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error,
        });
    }
};

module.exports = {
    getBootcamps,
    getBootcamp,
    postBootcamps,
    putBootcamps,
    deleteBootcamps,
};