const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(500).json({ err : err })
}

module.exports = errorHandlerMiddleware