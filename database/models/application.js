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
      unique: true,
      required: [true, 'please choose a semester name'],
      trim: true,
      lowercase: true,
    },
    admitted: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type : Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('application', applicationSchema);
