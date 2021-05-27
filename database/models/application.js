const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    program: {
      type: String,
      required: [true, 'please choose a program'],
      trim: true,
      lowercase: true,
    },
    semester: {
      type: String,
      unique: true,
      required: [true, 'please choose a semester name'],
      trim: true,
      lowercase: true,
    }
});

module.exports = mongoose.model('application', applicationSchema);
