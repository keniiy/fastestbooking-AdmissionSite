const { v4: uuidv4 } = require('uuid');
const models = require('../../database/models');
const queue = require('../../database/config/redisKueConfig');
const { successResponse, errorHelper } = require('../utils/helpers/response');
const { CreateApplicationLogs } = require('../workers/log');

module.exports = {
  async createStudent(req, res) {
    try {
      const student = await models.Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        userName: req.body.userName.toLowerCase(),
      });
      if (student._id) {
        const studentApplication = {
          Student: student._id,
          program: req.body.program,
          semester: req.body.semester,
      };
        queue.create('CreateApplicationLogs', studentApplication).priority(-10).attempts(5).save();
        queue.process('CreateApplicationLogs', (job, done) => {
            CreateApplicationLogs(job, done);
          done();
        });

        const returnStudent = {
            firstName: student.firstName,
            lastName: student.lastName,
            id: student._id,
            userName: student.userName,
            email: student.email,
          };
        return successResponse(res, 201, 'Student Application successfully Submitted', returnStudent);
      };
      return errorHelper(res, 400, 'Application could not be created');
    } catch (error) {
      return errorHelper(res, 500, "Internal Server Error");
    }
  },

  async UpdateApplication(req, res) {
    try {
	  const { id } = req.params;
    console.log(id);
      const {
        program,
        semester,
      } = req.body;
	  const editedApplication = await models.Application.findOneAndUpdate({
      studentId: id
    },
    {
      program,
      semester,
    },
    {returnOriginal: false});
      return successResponse(
        res,
        201,
        'Successfully updated Application',
        editedApplication
      );
    } catch (error) {
      return errorHelper(res, 500, error.message)
    }
  },
};
