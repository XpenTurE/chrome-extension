const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/', companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.post('/delete', companyController.deleteCompanies);
// Add other routes as needed

module.exports = router;
