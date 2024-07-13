// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  googleFormLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Job', JobSchema);
