
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


// Get All Jobs
const getAllJobs = async (req, res) => {
    res.send('Get All Jobs')
}

// Get Single Job
const getJob = async (req, res) => {
    res.send('Get Single Job')
}

//Create New Job
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
    // res.json(req.body)
}

//Update single job
const updateJob = async (req, res) => {
    res.send('Update Job')
}

//Delete Single Job
const deleteJob = async (req, res) => {
    res.send('Delete Job')
}
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
