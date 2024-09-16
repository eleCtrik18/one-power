// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/job'); 

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://1energy.co', // Allow this specific origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
