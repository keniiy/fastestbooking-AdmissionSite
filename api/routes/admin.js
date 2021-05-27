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


module.exports = router;
