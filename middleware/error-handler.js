// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    //set Default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something Went Wrrong, try again later'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  //Validation Error
  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors).map((item) => item.message).join(' & ')
    customError.statusCode = 400
  }

  //Cast Error
  if (err.name === 'CastError') {
    customError.msg = `No item found with ID: ${err.value}`
    customError.statusCode = 404
  }

  //Duplicate Error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}: ${Object.values(err.keyValue)}, please choose another value.`
    customError.statusCode = 400
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })

}

module.exports = errorHandlerMiddleware