const express = require('express');
const Controllers = require('../controllers/student');
const studentValidations = require('../utils/validation/student');


// const upload = multer();

const router = express.Router();

router.get('/:id', 
    studentValidations.validateStudent,
    Controllers.getStudentProfile
);

module.exports = router;
