const Validator = require('validatorjs');
const { errorHelper, successResponse } = require('../helpers/response');
const models = require('../../../database/models/index');

module.exports = {
  async validateDepartmentField(req, res, next) {
    try {
        const validator = new Validator(req.body, {
            department: 'required|string'
        });
        if (validator.fails()) {
            return errorHelper(res, 400, validator.errors.all());
        }
      return next();
    } catch (error) {
      return errorHelper(res, 500 , 'Internal Server error');
    }
  },

  async validateStatusField(req, res, next) {
    try {
        const validator = new Validator(req.body, {
            status: 'required|boolean'
        });
        if (validator.fails()) {
            return errorHelper(res, 400, validator.errors.all());
        }
      return next();
    } catch (error) {
      return errorHelper(res, 500 , 'Internal Server error');
    }
  },

  async validateStudent(req, res, next) {
    try {
      const { id } = req.params
      const exist = await models.Application.findOne({
        studentId: id
      });
      if (exist) {
        return next()
      }  

      return errorHelper(res, 500, 'sorry student user does not exist')
    } catch (error) {
      return errorHelper(res, 500 , 'Internal Server error');
    }
  },
};
