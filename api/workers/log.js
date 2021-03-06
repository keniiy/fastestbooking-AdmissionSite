/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const models = require('../../database/models');


async function CreateApplicationLogs(job, done) {
  try {
    const { data } = job;
    const autoCreateApplication = await models.Application.create({
      studentId: data.Student,
      program: data.program,
      semester: data.semester,
    });
    if (autoCreateApplication.studentId) {
      return done();
    }
    return done(new Error('Unable to create admission'));
  } catch (error) {
    return error;
  }
}

async function deleteStudentApplicationAndAccount(job, done) {
  try {
    const { data } = job;
    const autoCreateApplication = await models.Application.findOneAndDelete({
      studentId: data.Student,
    });
    if (autoCreateApplication.studentId) {
      return done(new Error('Unable to deleted application'));
    }
    return done();
  } catch (error) {
    return error;
  }
}

module.exports = {
  CreateApplicationLogs,
  deleteStudentApplicationAndAccount
};
