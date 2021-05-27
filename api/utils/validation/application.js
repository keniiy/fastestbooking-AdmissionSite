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
      program: 'string',
      semester: 'required|date',
    });
    if (validator.fails()) {
      return errorHelper(res, 400, validator.errors.all());
    }
    try {
      const { userName, email } = req.body;
      const applicant = await models.Student.findOne(
        { $or: [{ email }, { userName }] },
        '_id',
      ).exec();
      if (!applicant) {
        return next();
      }
      const allErrors = 'Applicant already registered with email or Username';
      return errorHelper(res, 400, allErrors);
    } catch (error) {
      return next({ message: 'Error validating student Application' });
    }
  },
};
