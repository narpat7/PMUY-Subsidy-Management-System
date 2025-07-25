import mongoose from 'mongoose';

const OfficerSchema = new mongoose.Schema({
  name: String,
  contact: String,
}, { _id: false });

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  income: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reason: { type: String, default: '' },
  subsidyPercentage: { type: Number, default: 0 },
  subsidyAmount: { type: Number, default: 0 },
  expectedConnectionDate: { type: Date },
  officer: OfficerSchema,
}, {
  timestamps: true,
});

export default mongoose.model('Application', ApplicationSchema);
