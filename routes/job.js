// routes/job.js
const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const apiResponse = require('../utils/const');

// Create a new job opening
router.post('/', async (req, res) => {
  const { title, description, googleFormLink } = req.body;
  const newJob = new Job({ title, description, googleFormLink });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(apiResponse(true, savedJob, 'Job created successfully', 201));
  } catch (err) {
    res.status(400).json(apiResponse(false, {}, err.message, 400));
  }
});

// Get all job openings
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(apiResponse(true, jobs, 'Jobs retrieved successfully', 200));
  } catch (err) {
    res.status(500).json(apiResponse(false, {}, err.message, 500));
  }
});

// Get a specific job opening by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json(apiResponse(false, {}, 'Job not found', 404));
    res.status(200).json(apiResponse(true, job, 'Job retrieved successfully', 200));
  } catch (err) {
    res.status(500).json(apiResponse(false, {}, err.message, 500));
  }
});

// Update a job opening
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJob) return res.status(404).json(apiResponse(false, {}, 'Job not found', 404));
    res.status(200).json(apiResponse(true, updatedJob, 'Job updated successfully', 200));
  } catch (err) {
    res.status(400).json(apiResponse(false, {}, err.message, 400));
  }
});

// Delete a job opening
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json(apiResponse(false, {}, 'Job not found', 404));
    res.status(200).json(apiResponse(true, {}, 'Job deleted successfully', 200));
  } catch (err) {
    res.status(500).json(apiResponse(false, {}, err.message, 500));
  }
});

module.exports = router;
