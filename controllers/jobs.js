
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


// Get All Jobs
const getAllJobs = async (req, res) => {
    // res.send('Get All Jobs')
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

// Get Single Job
const getJob = async (req, res) => {
    // res.send('Get Single Job')
    const { user: { userId }, params: { id: jobId } } = req

    const job = await Job.findOne({
        _id: jobId, createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })

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
    // res.send('Update Job')
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId } } = req
    if (company == '' || position == '') {
        throw new BadRequestError('Comapny or Position can not be empty.')
    }
    const job = await Job.findByIdAndUpdate(
        {
            _id: jobId,
            createdBy: userId
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })

}

//Delete Single Job
const deleteJob = async (req, res) => {
    // res.send('Delete Job')
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId } } = req
    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).send('Job Deleted')
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
