// const { StatusCodes } = require('http-status-codes');

// const errorHandlerMiddleware = (err, req, res, next) => {
//   let customError = {
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong, try again later'
//   };

//   // Handle validation errors from Mongoose
//   if (err.name === 'ValidationError') {
//     // Log the entire errors object
//     console.log('Validation Error Details:', err.errors);

//     // Log values from the errors object
//     console.log('Validation Error Messages:', Object.values(err.errors).map(item => item.message));

//     customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
//     customError.statusCode = StatusCodes.BAD_REQUEST;
//   }

//   // Handle duplicate key errors from MongoDB
//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
//     customError.statusCode = StatusCodes.BAD_REQUEST;
//   }

//   // Handle cast errors (e.g., invalid MongoDB ObjectId)
//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id: ${err.value}`;
//     customError.statusCode = StatusCodes.NOT_FOUND;
//   }

//   // Log the error for debugging purposes
//   console.error('Error:', err);

//   // Return the custom error message
//   return res.status(customError.statusCode).json({ msg: customError.msg });
// };

// module.exports = errorHandlerMiddleware;

const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware

