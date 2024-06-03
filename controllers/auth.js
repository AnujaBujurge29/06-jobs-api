
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    // const { name, email, password } = req.body
    // const salt = await becrypt.genSalt(10)
    // const hashedPassword = await becrypt.hash(password, salt)
    // const tempUser = {
    //     name, email, password: hashedPassword
    // // }
    // if (!name || !email || !password) {
    //     throw new BadRequestError('Please provide Name, Email and Password.')
    // }
    // const user = await User.create({ ...tempUser })
    const user = await User.create({ ...req.body })
    // const token = jwt.sign(
    //     { userId: user._id, name: user.name },
    //     'jwtSecret',
    //     { expiresIn: '30d' })
    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    // res.send('Login User')
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide Email and password.')
    }
    const user = await User.findOne({ email })


    if (!user) {
        throw new UnauthenticatedError('Invalid Username.')
    }
    //Compare Passward
    const isPasswordCorrect = await user.comparePossward(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Password.')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}