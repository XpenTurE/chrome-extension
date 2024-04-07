const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Import Mongoose
const companyRoutes = require('./routes/companyRoutes');
const config = require('./config');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/companies', companyRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
