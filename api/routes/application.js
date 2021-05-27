const express = require('express');
const Controllers = require('../controllers/application');
const applicationValidations = require('../utils/validation/application');

// const upload = multer();

const router = express.Router();

router.post(
  '/submit-application',
  applicationValidations.validateStudentApplication,
  Controllers.createStudent
);

router.patch(
  '/update-application/:id',
    applicationValidations.validateUpdateApplication,
    applicationValidations.validateStudent,
    Controllers.UpdateApplication
);

module.exports = router;
