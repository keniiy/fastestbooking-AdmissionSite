const express = require('express');
const Controllers = require('../controllers/admin');
const adminValidations = require('../utils/validation/admin');


// const upload = multer();

const router = express.Router();

router.get('/', 
    Controllers.greetAdmin
);

router.get('/get-all-student-application', 
    Controllers.getListOfApplication
);

router.post('/get-application-by-department', 
    adminValidations.validateDepartmentField,
    Controllers.getListByDepartment
);

router.delete('/delete-student-application-and-account/:id', 
    adminValidations.validateStudent,
    Controllers.getListByDepartment
);

module.exports = router;
