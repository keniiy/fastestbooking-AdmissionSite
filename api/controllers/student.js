const { v4: uuidv4 } = require('uuid');
const models = require('../../database/models');
const queue = require('../../database/config/redisKueConfig');
const { successResponse, errorHelper } = require('../utils/helpers/response');
const { deleteStudentApplicationAndAccount } = require('../workers/log');

module.exports = {

    async getStudentProfile(req, res) {
       try {
           const { id } = req.params;
           const findProfile = await models.Student.findOne({
               _id: id
           })
           return successResponse(res, 200, 'successfully fetched user information',  { 
               message: `welcome ${findProfile.firstName} ${findProfile.firstName},`,
               profile: findProfile
            })
       } catch (error) {
           return errorHelper(res, 500, "Internal server error")
       }
    },
};
