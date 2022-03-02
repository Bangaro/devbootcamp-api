//@desc     Logs request to console
const logger = (req, res, next) => {
    console.log(
        `"${req.method} ${req.path} - ${req.ip} - ${new Date().toString()}"`
    );
    next();
};

module.exports = { logger };