const Validator = require('validatorjs');
const { errorHelper, successResponse } = require('../helpers/response');
const models = require('../../../database/models/index');

module.exports = {
  async validateStudentApplication(req, res, next) {
    const validator = new Validator(req.body, {
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|string|email',
      userName: 'required|string',
      program: 'required|string',
      semester: 'required|string',
    });
    if (validator.fails()) {
      return errorHelper(res, 400, validator.errors.all());
    }
    try {
      const { userName, email } = req.body;
      console.log(userName, email);
      const applicant = await models.Student.findOne(
        { $or: [{ email }, { userName }] },
      )
      if (!applicant) {
        console.log('userName, email');
        return next();
      }
      return errorHelper(res, 400, 'You have already submitted admission go to the update application page if you want to update');
    } catch (error) {
      return error(res, 500, 'Internal Server Error');
    }
  },

  
};
