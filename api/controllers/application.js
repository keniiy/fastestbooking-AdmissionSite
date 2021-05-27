const { v4: uuidv4 } = require('uuid');
const models = require('../../database/models');
const queue = require('../../database/config/redisKueConfig');
const { successResponse, errorHelper } = require('../utils/helpers/response');
const { CreateApplicationLogs } = require('../workers/log');

module.exports = {
  async createUser(req, res) {
    try {
      const student = await models.Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        userName: req.body.userName.toLowerCase(),
      });
      if (student._id) {
        const studentApplication = {
          id: req.body._id,
          program: req.body.program,
          semester: req.body.semester,

        };
        queue.create('CreateApplicationLogs', studentApplication).priority(-10).attempts(5).save();
        queue.process('CreateApplicationLogs', (job, done) => {
            CreateApplicationLogs(job, done);
          done();
        });
        return successResponse(res, 201, 'Student Application successfully Submitted', {
          returnUser,
          token,
        });
      };
      return errorHelper(res, 400, 'Application could not be created');
    } catch (error) {
      return errorHelper(res, 500, 'Internal server Error');
    }
  }
};
