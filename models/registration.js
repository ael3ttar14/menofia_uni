import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'user',
    required: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'subject',
    required: true,
  }],
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
