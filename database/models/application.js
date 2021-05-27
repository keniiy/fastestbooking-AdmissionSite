const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
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
      required: [true, 'please choose a semester name'],
      trim: true,
      lowercase: true,
    },
    admitted: {
      type: Boolean,
      default: false
    },
    updated_at: {
      type : Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('application', applicationSchema);
