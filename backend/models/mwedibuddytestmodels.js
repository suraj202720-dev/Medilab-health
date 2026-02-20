const mongoose = require('mongoose');

const MwedibuddyTestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  testName: { type: String, required: true },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String }
});

module.exports = mongoose.model('MwedibuddyTest', MwedibuddyTestSchema);
