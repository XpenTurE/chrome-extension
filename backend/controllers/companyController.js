const Company = require('../models/Company');

module.exports = {
  createCompany: async (req, res) => {
    try {
      console.log("create company hit");
      const companyData = req.body;

      // Trim whitespace from string properties
      const trimmedCompanyData = {};
      for (const [key, value] of Object.entries(companyData)) {
        if (typeof value === 'string') {
          trimmedCompanyData[key] = value.trim();
        } else {
          trimmedCompanyData[key] = value;
        }
      }

      console.log(trimmedCompanyData);
      const newCompany = await Company.create(trimmedCompanyData);
      res.status(201).json(newCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteCompanies: async (req, res) => {
    try {
      const companyIdsToDelete = req.body.companyIds;

      // Delete multiple companies by their IDs
      const deleteResult = await Company.deleteMany({ _id: { $in: companyIdsToDelete } });

      // Check if any companies were deleted
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ message: 'No companies found with the provided IDs' });
      }

      res.status(200).json({ message: 'Companies deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
