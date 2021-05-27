const { v4: uuidv4 } = require('uuid');
const models = require('../../database/models');
const queue = require('../../database/config/redisKueConfig');
const { successResponse, errorHelper } = require('../utils/helpers/response');
const { deleteStudentApplicationAndAccount } = require('../workers/log');

module.exports = {

    greetAdmin(req, res) {
        return successResponse(res, 200, "Hello Admin, how you doing Today, let check up some admission")
    },

    async getListOfApplication(req, res) {
        try {
            const fetchAllApplication = await models.Application.find();
            return successResponse(res, 200, "successfully fetch all application", { applications: fetchAllApplication })
        } catch (error) {
            return errorHelper(res, 500, 'Internal Server Error')
        }
    },

    async getListByDepartment(req, res) {
        try {
            const {department} = req.body;
            const applicationByDepartment = await models.Application.find({
                program: department
            });
            return successResponse(res, 200, "successfully fetch all application", { applications: applicationByDepartment})
        } catch (error) {
            return errorHelper(res, 500, 'Internal Server Error')
        }
    },

    async deleteApplicationProcess(req, res) {
        try {
         const { id } = req.params;

          const application = await models.Student.findOneAndDelete({
            _id: id
          });
            const deleteApplication = {
              Student: id,
          };
            queue.create('deleteStudentApplicationAndAccount', deleteApplication).save();
            queue.process('deleteStudentApplicationAndAccount', (job, done) => {
                deleteStudentApplicationAndAccount(job, done);
              done();
            });
            return successResponse(res, 200, 'Student Application successfully Deleted');
        } catch (error) {
          return errorHelper(res, 500, "Internal Server Error");
        }
      },

      async changeStudentAdmissionStatus(req, res) {
        try {
          const { id } = req.params;
          const { status } = req.body
          const editedApplication = await models.Application.findOneAndUpdate({
          studentId: id
        },
        {
          admitted : status,
        },
        {returnOriginal: false});
          return successResponse(
            res,
            201,
            'Successfully updated Student Application',
            editedApplication
          );
        } catch (error) {
          return errorHelper(res, 500, error.message)
        }
      },
};
