/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const models = require('../../database/models');


async function CreateApplicationLogs(job, done) {
  try {
    const { data } = job;
    const autoCreateApplication = await models.Application.create({
      StudentId: data.id,
      program: data.program,
      semester: data.semester,
    });
    if (autoCreateApplication) {
      return done();
    }
    return done(new Error('Unable to create admission'));
  } catch (error) {
    return error;
  }
}

module.exports = {
  CreateApplicationLogs
};
