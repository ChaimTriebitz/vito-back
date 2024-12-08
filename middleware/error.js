const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
   const error = new ErrorResponse(err.message, err.statusCode)
   res.status(error.statuscode || 500).json({ success: false, error: error.message || 'Server Error' })
}

module.exports = errorHandler