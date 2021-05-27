const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'student must have a first name'],
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, 'student must have a last name'],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'student must have an email'],
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      unique: true,
      required: [true, 'student must have a user name'],
      trim: true,
    },
    cgpa: {
      type: Number,
      default: 0
    }
  });

module.exports = mongoose.model('student', studentSchema);
