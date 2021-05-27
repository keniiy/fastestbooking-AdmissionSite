const Validator = require('validatorjs');
const { errorHelper, successResponse } = require('../helpers/response');
const models = require('../../../database/models/index');

module.exports = {
  async validateStudent(req, res, next) {
    try {
      const { id } = req.params;
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
