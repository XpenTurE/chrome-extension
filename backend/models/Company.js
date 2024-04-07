const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  description: String,
  website: String,
  phone: String,
  employees: String,
  industry: String,
  headquarters: String,
  founded: String,
  logo: String // Add a field for the URL of the company logo
  // Add other fields as needed
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
