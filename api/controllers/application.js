const { v4: uuidv4 } = require('uuid');
const models = require('../../database/models');
const queue = require('../../database/config/redisKueConfig');
const { successResponse, errorHelper } = require('../utils/helpers/response');
const { CreateApplicationLogs } = require('../workers/log');
const { response } = require('express');

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

  async checkAdmissionStatus(req, res) {
    try {
      const { id } = req.params;

      const checkAdmission = await models.Application.findOne({
        studentId: id
      }).populate('studentId', {
        firstName: 1,
        lastName: 1,
        userName: 1,
        email: 1,
      });
      //should have removed the admitted field but left it for understand purpose
      if (!checkAdmission.admitted) {
        const admissionInfo = 'You have not been given admission check back later'
        return successResponse(res, 200, 'successfully fetched admission profile ', {checkAdmission, admissionInfo})
      }
   
      const admissionInfo = `Hello ${checkAdmission.studentId.lastName}, we are happy to inform you that have been admitted into LAGOS STATE UNIVERSITY check your profile for more information`
      return successResponse(res, 200, 'successfully fetched admission profile ', {checkAdmission, admissionInfo})
    } catch (error) {
      return errorHelper(res, 500, 'Internal server Error');
    }
  },

  async deleteApplication(req, res) {
    try {
      const { id } = req.params;

      const checkAdmission = await models.Application.findOneAndDelete({
        studentId: id
      });

      if(checkAdmission) {
        return successResponse (res, 200, 'Your application as been terminated you wont be able to apply till next Spring')
      }

      return errorHelper (res, 500, "you haven't enrolled yet" )
    } catch (error) {
      return errorHelper(res, 500, 'Internal server Error');
    }
  },
};
